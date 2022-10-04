export type TransactionStatus = 'unsent' | 'prompting' | 'pending' | 'success' | 'error';

type MintMutationState = {
  error: Error | null;
  modalOpen: boolean;
  txnStatus: TransactionStatus;
  gasPrice: any;
};

export const initialState: MintMutationState = {
  error: null,
  modalOpen: false,
  txnStatus: 'unsent',
  gasPrice: null,
};

export type Actions =
  | { type: 'gas_estimate'; payload: { gasPrice: number } }
  | { type: 'prompting' }
  | { type: 'pending' }
  | { type: 'success' }
  | { type: 'error' }
  | { type: 'settled' };

export function reducer(state: MintMutationState, action: Actions): MintMutationState {
  switch (action.type) {
    case 'gas_estimate':
      return { ...state };
    case 'prompting':
      return {
        ...state,
        txnStatus: 'prompting',
        modalOpen: true,
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
      };

    case 'settled':
      return {
        ...state,
        modalOpen: false,
        txnStatus: 'unsent',
      };

    default:
      return { ...state };
  }
}
