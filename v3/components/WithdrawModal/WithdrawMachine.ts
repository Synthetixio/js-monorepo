import Wei, { wei } from '@synthetixio/wei';
import { createMachine, assign } from 'xstate';

export const Events = {
  SET_AMOUNT: 'SET_AMOUNT',
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
};

type EventNamesType = typeof Events;
type WithdrawEvents =
  | { type: EventNamesType['SET_AMOUNT']; amount: Wei }
  | { type: EventNamesType['RETRY'] }
  | { type: EventNamesType['RUN'] }
  | { type: EventNamesType['SUCCESS'] }
  | { type: EventNamesType['FAILURE'] }
  | { type: EventNamesType['RESET'] };

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
      }),
    },
    [Events.SET_AMOUNT]: {
      actions: assign({ amount: (_context, event) => event.amount }),
    },
  },
  states: {
    idle: {
      on: {
        [Events.RUN]: [
          { target: State.withdraw, cond: (context) => context.amount.gt(0) },
          { target: State.unwrap, cond: (context) => context.amount.gt(0) },
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
        onDone: [{ target: State.unwrap }],
      },
    },

    unwrap: {
      invoke: {
        src: ServiceNames.unwrap,
        onDone: {
          target: State.success,
        },
        onError: {
          target: State.failed,
          actions: assign({ error: (_context, event) => ({ error: event.data, step: 'unwrap' }) }),
        },
      },
      on: { [Events.SUCCESS]: State.success },
    },
    [State.failed]: {
      on: {
        RETRY: [
          {
            target: State['withdraw'],
            cond: (c) => c.error?.step === FailedSteps.withdraw,
            actions: assign({ error: (_) => null }),
          },
          {
            target: State['unwrap'],
            cond: (c) => c.error?.step === FailedSteps.unwrap,
            actions: assign({ error: (_) => null }),
          },
        ],
      },
    },
    success: {},
  },
});
