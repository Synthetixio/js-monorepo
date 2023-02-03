import { createMachine, assign } from 'xstate';

type Context = {
  error: Error | null;
};
type FailureEvent = { type: 'FAILURE'; error: Error };
type Events =
  | FailureEvent
  | { type: 'RETRY' }
  | { type: 'WRAP' }
  | { type: 'APPROVE' }
  | { type: 'DEPOSIT' }
  | { type: 'SUCCESS' }
  | { type: 'RETRY' }
  | { type: 'RESET' };

export type MachineState =
  | {
      value: 'idle';
      context: {
        error: null;
      };
    }
  | {
      value: 'wrap';
      context: {
        error: Error | null;
        prosessing: boolean;
      };
    }
  | {
      value: 'approve';
      context: {
        error: Error | null;
        prosessing: boolean;
      };
    }
  | {
      value: 'deposit';
      context: {
        error: Error | null;
        prosessing: boolean;
      };
    }
  | {
      value: 'success';
      context: {
        error: null;
        prosessing: false;
      };
    };

export const DepositMachine = createMachine<Context, Events, MachineState>({
  id: 'DepositMachine',
  type: 'atomic',
  initial: 'idle',
  context: {
    error: null,
  },
  on: {
    RESET: 'idle',
  },
  states: {
    idle: {
      on: {
        WRAP: 'wrap',
        APPROVE: 'approve',
        DEPOSIT: 'deposit',
      },
    },
    wrap: {
      on: {
        APPROVE: 'approve',
        DEPOSIT: 'deposit',
        FAILURE: {
          actions: assign<Context, FailureEvent>({
            error: (c, event) => event.error,
          }),
        },
        RETRY: {
          actions: assign({
            error: (_) => null,
          }),
        },
      },
    },
    approve: {
      on: {
        DEPOSIT: 'deposit',
        FAILURE: {
          actions: assign<Context, FailureEvent>({
            error: (c, event) => event.error,
          }),
        },
        RETRY: {
          actions: assign({
            error: (_) => null,
          }),
        },
      },
    },
    deposit: {
      on: {
        SUCCESS: 'success',
        FAILURE: {
          actions: assign<Context, FailureEvent>({
            error: (_c, event) => event.error,
          }),
        },
        RETRY: {
          actions: assign({
            error: (_) => null,
          }),
        },
      },
    },
    success: {},
  },
});
