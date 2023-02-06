import Wei, { wei } from '@synthetixio/wei';
import { createMachine, assign } from 'xstate';

type Context = {
  error: { error: Error; step: 'wrap' | 'approve' | 'deposit' } | null;
  requireApproval: boolean;
  wrapAmount: Wei;
  infiniteApproval: boolean;
};

type Events =
  | { type: 'SET_REQUIRE_APPROVAL'; requireApproval: boolean }
  | { type: 'SET_WRAP_AMOUNT'; wrapAmount: Wei }
  | { type: 'SET_INFINITE_APPROVAL'; infiniteApproval: boolean }
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
      value: 'wrap';
      context: Context & { error: null };
    }
  | {
      value: 'approve';
      context: Context & { error: null };
    }
  | {
      value: 'deposit';
      context: Context & { error: null };
    }
  | {
      value: 'error';
      context: Context & { error: { error: Error; step: 'wrap' | 'approve' | 'deposit' } };
    }
  | {
      value: 'success';
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
export const DepositMachine = createMachine<Context, Events, MachineState>({
  id: 'DepositMachine',
  initial: 'idle',
  predictableActionArguments: true,
  context: initialContext,
  on: {
    RESET: {
      target: 'idle',
      actions: assign({
        wrapAmount: (_) => initialContext.wrapAmount,
        error: (_) => initialContext.error,
        requireApproval: (_) => initialContext.requireApproval,
        infiniteApproval: (_) => initialContext.infiniteApproval,
      }),
    },
    SET_REQUIRE_APPROVAL: {
      actions: assign({ requireApproval: (_context, event) => event.requireApproval }),
    },
    SET_WRAP_AMOUNT: {
      actions: assign({ wrapAmount: (_context, event) => event.wrapAmount }),
    },
    SET_INFINITE_APPROVAL: {
      actions: assign({ infiniteApproval: (_context, event) => event.infiniteApproval }),
    },
  },
  states: {
    idle: {
      on: {
        RUN: [
          { target: 'wrap', cond: (context) => context.wrapAmount.gt(0) },
          { target: 'approve', cond: (context) => context.requireApproval },
          { target: 'deposit', cond: (context) => context.requireApproval },
        ],
      },
    },
    wrap: {
      invoke: {
        id: 'wrap-eth',
        src: 'wrapEth',
        onError: {
          target: 'failure',
          actions: assign({ error: (_context, event) => ({ error: event.data, step: 'wrap' }) }),
        },
        onDone: [
          { target: 'approve', cond: (context) => context.requireApproval },
          { target: 'deposit' },
        ],
      },
    },
    approve: {
      invoke: {
        src: 'approveWETH',
        onDone: {
          target: 'deposit',
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (_context, event) => ({ error: event.data, step: 'approve' }) }),
        },
      },
    },
    deposit: {
      invoke: {
        src: 'executeDeposit',
        onDone: {
          target: 'success',
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (_context, event) => ({ error: event.data, step: 'deposit' }) }),
        },
      },
      on: { SUCCESS: 'success' },
    },
    failure: {
      on: {
        RETRY: [
          {
            target: 'approve',
            cond: (c) => c.error?.step === 'approve',
            actions: assign({ error: (_) => null }),
          },
          {
            target: 'wrap',
            cond: (c) => c.error?.step === 'wrap',
            actions: assign({ error: (_) => null }),
          },
          {
            target: 'deposit',
            cond: (c) => c.error?.step === 'deposit',
            actions: assign({ error: (_) => null }),
          },
        ],
      },
    },
    success: {},
  },
});
