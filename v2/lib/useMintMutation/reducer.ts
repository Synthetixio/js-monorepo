//  TODO this should be a generic transaction reducer that used elsewhere too
export type TransactionStatus = 'unsent' | 'prompting' | 'pending' | 'success' | 'error';

type MintMutationState = {
  error: Error | null;
  errorType: 'transaction' | 'gasEstimate' | null;
  modalOpen: boolean;
  txnStatus: TransactionStatus;
};

export const initialState: MintMutationState = {
  error: null,
  errorType: null,
  modalOpen: false,
  txnStatus: 'unsent',
};

export type Actions =
  | { type: 'prompting' }
  | { type: 'pending' }
  | { type: 'success' }
  | { type: 'error'; payload: { error: Error; errorType: 'transaction' | 'gasEstimate' } }
  | { type: 'settled' };

export function reducer(state: MintMutationState, action: Actions): MintMutationState {
  switch (action.type) {
    case 'prompting':
      return {
        ...state,
        txnStatus: 'prompting',
        modalOpen: true,
        error: null,
        errorType: null,
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
        errorType: action.payload.errorType,
      };

    case 'settled':
      return {
        ...state,
        modalOpen: false,
        txnStatus: 'unsent',
        error: null,
        errorType: null,
      };

    default:
      return { ...state };
  }
}
