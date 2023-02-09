import Wei, { wei } from '@synthetixio/wei';
import { createMachine, assign } from 'xstate';

export const Events = {
  SET_AMOUNT: 'SET_AMOUNT',
  SET_COLLATERAL_SYMBOL: 'SET_COLLATERAL_SYMBOL',
  RETRY: 'RETRY',
  RUN: 'RUN',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  RESET: 'RESET',
} as const;

export const State = {
  idle: 'idle',
  withdraw: 'withdraw',
  unwrap: 'unwrap',
  failed: 'failed',
  success: 'success',
} as const;

export const FailedSteps = {
  [State.withdraw]: State.withdraw,
  [State.unwrap]: State.unwrap,
} as const;

export const ServiceNames = {
  withdraw: 'withdraw',
  unwrap: 'unwrap',
} as const;

type Context = {
  error: { error: Error; step: keyof typeof FailedSteps } | null;
  amount: Wei;
  collateralSymbol?: string;
};

type EventType = typeof Events;
type WithdrawEvents =
  | { type: EventType['SET_AMOUNT']; amount: Wei }
  | { type: EventType['SET_COLLATERAL_SYMBOL']; symbol: string }
  | { type: EventType['RETRY'] }
  | { type: EventType['RUN'] }
  | { type: EventType['SUCCESS'] }
  | { type: EventType['FAILURE'] }
  | { type: EventType['RESET'] };

type StateType = typeof State;
export type MachineState =
  | {
      value: StateType['idle'];
      context: Context & { error: null };
    }
  | {
      value: StateType['withdraw'];
      context: Context & { error: null };
    }
  | {
      value: StateType['unwrap'];
      context: Context & { error: null };
    }
  | {
      value: StateType['failed'];
      context: Context & { error: { error: Error; step: keyof typeof FailedSteps } };
    }
  | {
      value: StateType['success'];
      context: Context & {
        error: null;
      };
    };

const initialContext = {
  amount: wei(0),
  error: null,
  collateralSymbol: undefined,
};
export const WithdrawMachine = createMachine<Context, WithdrawEvents, MachineState>({
  id: 'WithdrawMachine',
  initial: State.idle,
  predictableActionArguments: true,
  context: initialContext,
  on: {
    [Events.RESET]: {
      target: State.idle,
      actions: assign({
        amount: (_) => initialContext.amount,
        error: (_) => initialContext.error,
        collateralSymbol: (_) => initialContext.collateralSymbol,
      }),
    },
    [Events.SET_AMOUNT]: {
      actions: assign({ amount: (_context, event) => event.amount }),
    },
    [Events.SET_COLLATERAL_SYMBOL]: {
      actions: assign({ collateralSymbol: (_context, event) => event.symbol }),
    },
  },
  states: {
    [State.idle]: {
      on: {
        [Events.RUN]: [
          { target: State.withdraw, cond: (context) => context.amount.gt(0) },
          {
            target: State.unwrap,
            cond: (context) => context.amount.gt(0) && context.collateralSymbol === 'WETH',
          },
        ],
      },
    },
    [State.withdraw]: {
      invoke: {
        src: ServiceNames.withdraw,
        onError: {
          target: State.failed,
          actions: assign({
            error: (_context, event) => ({ error: event.data, step: FailedSteps.withdraw }),
          }),
        },
        onDone: [
          { target: State.unwrap, cond: (context) => context.collateralSymbol === 'WETH' },
          { target: State.success },
        ],
      },
    },

    [State.unwrap]: {
      invoke: {
        src: ServiceNames.unwrap,
        onDone: {
          target: State.success,
        },
        onError: {
          target: State.failed,
          actions: assign({
            error: (_context, event) => ({ error: event.data, step: FailedSteps.unwrap }),
          }),
        },
      },
    },
    [State.failed]: {
      on: {
        [Events.RETRY]: [
          {
            target: State.withdraw,
            cond: (c) => c.error?.step === FailedSteps.withdraw,
            actions: assign({ error: (_) => null }),
          },
          {
            target: State.unwrap,
            cond: (c) => c.error?.step === FailedSteps.unwrap,
            actions: assign({ error: (_) => null }),
          },
        ],
      },
    },
    [State.success]: {},
  },
});
