import Wei, { wei } from '@synthetixio/wei';
import { createMachine, assign } from 'xstate';

export const EventNames = {
  SET_REQUIRE_APPROVAL: 'SET_REQUIRE_APPROVAL',
  SET_WRAP_AMOUNT: 'SET_WRAP_AMOUNT',
  SET_INFINITE_APPROVAL: 'SET_INFINITE_APPROVAL',
  RETRY: 'RETRY',
  RUN: 'RUN',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  RESET: 'RESET',
} as const;

export const StateNames = {
  idle: 'idle',
  wrap: 'wrap',
  approve: 'approve',
  deposit: 'deposit',
  error: 'error',
  success: 'success',
} as const;

export const ErrorSteps = {
  [StateNames.approve]: StateNames.approve,
  [StateNames.wrap]: StateNames.wrap,
  [StateNames.deposit]: StateNames.deposit,
} as const;

export const ServiceNames = {
  wrapEth: 'wrapEth',
  approveWETH: 'approveWETH',
  executeDeposit: 'executeDeposit',
} as const;

type Context = {
  error: { error: Error; step: keyof typeof ErrorSteps } | null;
  requireApproval: boolean;
  wrapAmount: Wei;
  infiniteApproval: boolean;
};

type EventNamesType = typeof EventNames;
type DepositEvents =
  | { type: EventNamesType['SET_REQUIRE_APPROVAL']; requireApproval: boolean }
  | { type: EventNamesType['SET_WRAP_AMOUNT']; wrapAmount: Wei }
  | { type: EventNamesType['SET_INFINITE_APPROVAL']; infiniteApproval: boolean }
  | { type: EventNamesType['RETRY'] }
  | { type: EventNamesType['RUN'] }
  | { type: EventNamesType['SUCCESS'] }
  | { type: EventNamesType['FAILURE'] }
  | { type: EventNamesType['RESET'] };

type StateNamesType = typeof StateNames;
type MachineState =
  | {
      value: StateNamesType['idle'];
      context: Context & { error: null };
    }
  | {
      value: StateNamesType['wrap'];
      context: Context & { error: null };
    }
  | {
      value: StateNamesType['approve'];
      context: Context & { error: null };
    }
  | {
      value: StateNamesType['deposit'];
      context: Context & { error: null };
    }
  | {
      value: StateNamesType['error'];
      context: Context & { error: { error: Error; step: 'wrap' | 'approve' | 'deposit' } };
    }
  | {
      value: StateNamesType['success'];
      context: Context & {
        error: null;
      };
    };

const initialContext = {
  wrapAmount: wei(0),
  error: null,
  requireApproval: false,
  infiniteApproval: false,
};

export const DepositMachine = createMachine<Context, DepositEvents, MachineState>({
  id: 'DepositMachine',
  initial: StateNames.idle,
  predictableActionArguments: true,
  context: initialContext,
  on: {
    [EventNames.RUN]: {
      target: StateNames.deposit,
      actions: assign({
        wrapAmount: (_) => initialContext.wrapAmount,
        error: (_) => initialContext.error,
        requireApproval: (_) => initialContext.requireApproval,
        infiniteApproval: (_) => initialContext.infiniteApproval,
      }),
    },
    [EventNames.SET_REQUIRE_APPROVAL]: {
      actions: assign({ requireApproval: (_context, event) => event.requireApproval }),
    },
    [EventNames.SET_WRAP_AMOUNT]: {
      actions: assign({ wrapAmount: (_context, event) => event.wrapAmount }),
    },
    [EventNames.SET_INFINITE_APPROVAL]: {
      actions: assign({ infiniteApproval: (_context, event) => event.infiniteApproval }),
    },
  },
  states: {
    idle: {
      on: {
        [EventNames.RUN]: [
          { target: StateNames.wrap, cond: (context) => context.wrapAmount.gt(0) },
          { target: StateNames.approve, cond: (context) => context.requireApproval },
          { target: StateNames.deposit },
        ],
      },
    },
    [StateNames.wrap]: {
      invoke: {
        src: ServiceNames.wrapEth,
        onError: {
          target: StateNames.error,
          actions: assign({
            error: (_context, event) => ({ error: event.data, step: ErrorSteps.wrap }),
          }),
        },
        onDone: [
          { target: StateNames.approve, cond: (context) => context.requireApproval },
          { target: StateNames.deposit },
        ],
      },
    },
    [StateNames.approve]: {
      invoke: {
        src: ServiceNames.approveWETH,
        onDone: {
          target: StateNames.deposit,
        },
        onError: {
          target: StateNames.error,
          actions: assign({
            error: (_context, event) => ({ error: event.data, step: ErrorSteps.approve }),
          }),
        },
      },
    },
    [StateNames.deposit]: {
      invoke: {
        src: ServiceNames.executeDeposit,
        onDone: {
          target: StateNames.success,
        },
        onError: {
          target: StateNames.error,
          actions: assign({
            error: (_context, event) => ({ error: event.data, step: ErrorSteps.deposit }),
          }),
        },
      },
      on: { [EventNames.SUCCESS]: StateNames.success },
    },
    [StateNames.error]: {
      on: {
        [EventNames.RETRY]: [
          {
            target: StateNames.approve,
            cond: (c) => c.error?.step === ErrorSteps.approve,
            actions: assign({ error: (_) => null }),
          },
          {
            target: StateNames.wrap,
            cond: (c) => c.error?.step === ErrorSteps.wrap,
            actions: assign({ error: (_) => null }),
          },
          {
            target: StateNames.deposit,
            cond: (c) => c.error?.step === ErrorSteps.deposit,
            actions: assign({ error: (_) => null }),
          },
        ],
      },
    },
    [StateNames.success]: {},
  },
});
