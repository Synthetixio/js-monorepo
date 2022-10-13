export type TransactionStatus = 'unsent' | 'prompting' | 'pending' | 'success' | 'error';

type TxnState = {
  error: Error | null;
  modalOpen: boolean;
  txnStatus: TransactionStatus;
};

export const initialState: TxnState = {
  error: null,
  modalOpen: false,
  txnStatus: 'unsent',
};

export type Actions =
  | { type: 'prompting' }
  | { type: 'pending' }
  | { type: 'success' }
  | { type: 'error'; payload: { error: Error } }
  | { type: 'settled' };

export function reducer(state: TxnState, action: Actions): TxnState {
  switch (action.type) {
    case 'prompting':
      return {
        ...state,
        txnStatus: 'prompting',
        modalOpen: true,
        error: null,
      };

    case 'pending':
      return {
        ...state,
        txnStatus: 'pending',
      };

    case 'success':
      return {
        ...state,
        txnStatus: 'success',
      };

    case 'error':
      return {
        ...state,
        txnStatus: 'error',
        error: action.payload.error,
      };

    case 'settled':
      return {
        ...state,
        modalOpen: false,
        txnStatus: 'unsent',
        error: null,
      };

    default:
      return state;
  }
}
