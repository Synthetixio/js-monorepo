import Wei, { wei } from '@synthetixio/wei';
import { createMachine, assign } from 'xstate';

type Context = {
  error: { error: Error; step: 'unwrap' | 'withdraw' } | null;
  amount: Wei;
};

type Events =
  | { type: 'SET_AMOUNT'; amount: Wei }
  | { type: 'RETRY' }
  | { type: 'RUN' }
  | { type: 'SUCCESS' }
  | { type: 'FAILURE' }
  | { type: 'RESET' };

export type MachineState =
  | {
      value: 'idle';
      context: Context & { error: null };
    }
  | {
      value: 'unwrap';
      context: Context & { error: null };
    }
  | {
      value: 'withdraw';
      context: Context & { error: null };
    }
  | {
      value: 'error';
      context: Context & { error: { error: Error; step: 'withdraw' | 'unwrap' } };
    }
  | {
      value: 'success';
      context: Context & {
        error: null;
      };
    };
const initialContext = {
  amount: wei(0),
  error: null,
};
export const WithdrawMachine = createMachine<Context, Events, MachineState>({
  id: 'WithdrawMachine',
  initial: 'idle',
  predictableActionArguments: true,
  context: initialContext,
  on: {
    RESET: {
      target: 'idle',
      actions: assign({
        amount: (_) => initialContext.amount,
        error: (_) => initialContext.error,
      }),
    },
    SET_AMOUNT: {
      actions: assign({ amount: (_context, event) => event.amount }),
    },
  },
  states: {
    idle: {
      on: {
        RUN: [
          { target: 'withdraw', cond: (context) => context.amount.gt(0) },
          { target: 'unwrap', cond: (context) => context.amount.gt(0) },
        ],
      },
    },
    withdraw: {
      invoke: {
        id: 'withdraw',
        src: 'withdraw',
        onError: {
          target: 'failure',
          actions: assign({
            error: (_context, event) => ({ error: event.data, step: 'withdraw' }),
          }),
        },
        onDone: [{ target: 'unwrap' }],
      },
    },

    unwrap: {
      invoke: {
        src: 'unwrap',
        onDone: {
          target: 'success',
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (_context, event) => ({ error: event.data, step: 'unwrap' }) }),
        },
      },
      on: { SUCCESS: 'success' },
    },
    failure: {
      on: {
        RETRY: [
          {
            target: 'withdraw',
            cond: (c) => c.error?.step === 'withdraw',
            actions: assign({ error: (_) => null }),
          },
          {
            target: 'unwrap',
            cond: (c) => c.error?.step === 'unwrap',
            actions: assign({ error: (_) => null }),
          },
        ],
      },
    },
    success: {},
  },
});
