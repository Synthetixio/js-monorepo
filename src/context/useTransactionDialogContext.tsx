import { TransactionNotifier } from '@synthetixio/transaction-notifier';
import { Dialog, Spinner } from 'components';
import { providers } from 'ethers';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';

import { TransactionLogo } from './TransactionLogo';

export type TxState = 'signing' | 'mining' | 'failed' | 'confirmed' | 'error';

interface TransactionDialogContextType {
  setTxHash: Dispatch<string | undefined>;
  visible: boolean;
  setContent: Dispatch<SetStateAction<ReactNode | undefined>>;
  state: TxState;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setState: Dispatch<SetStateAction<TxState>>;
}

const TransactionDialogContext = createContext<unknown>(null);

export const useTransactionModalContext = () => {
  return useContext(TransactionDialogContext) as TransactionDialogContextType;
};

const TransactionDialogContextProvider: React.FC<{
  provider: providers.Web3Provider;
  children: React.ReactNode;
}> = ({ children, provider }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ReactNode | undefined>(undefined);
  const [state, setState] = useState<TxState>('signing');
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (txHash) {
      setVisible(true);
      setState('signing');
      const emitter = new TransactionNotifier(provider).hash(txHash);
      emitter.on('txConfirmed', () => setState('confirmed'));
      emitter.on('txError', () => setState('error'));
      emitter.on('txFailed', () => setState('failed'));
      emitter.on('txSent', () => setState('mining'));
    }
  }, [txHash, provider]);

  useEffect(() => {
    if (!visible) setTxHash(undefined);
  }, [visible]);

  const stateText: Record<TxState, Record<string, string>> = {
    confirmed: {
      tile: 'Transaction Confirmed',
      subline: 'You can now proceed with the dApp.'
    },
    error: {
      tile: 'Transaction Failed',
      subline: 'While processing your transaction an error occurred.'
    },
    failed: {
      tile: 'Transaction Failed',
      subline: 'While processing your transaction an error occurred.'
    },
    signing: {
      tile: 'Transaction Signing',
      subline: 'Follow the prompts of your wallet provider and sign the transaction.'
    },
    mining: {
      tile: 'Transaction Pending',
      subline: 'Waiting for transaction to be included into the next block.'
    }
  };

  return (
    <TransactionDialogContext.Provider
      value={{
        visible,
        setVisible,
        state,
        setContent,
        setTxHash,
        setState
      }}
    >
      <Dialog disableClose open={visible} onClose={() => setVisible(false)}>
        <div className='ui-flex ui-flex-col ui-items-center'>
          <TransactionLogo txState={state} />
          <h4 className='ui-tg-title-h4'>{stateText[state].tile}</h4>
          <span className='ui-tg-caption ui-text-center ui-text-gray-500'>
            {stateText[state].subline}
          </span>
          {content && (
            <div className='ui-bg-black ui-rounded ui-w-[314px] ui-py-6 ui-my-6'>{content}</div>
          )}
          {state === 'mining' && <Spinner className='ui-mr-2' variant='secondary' />}
        </div>
      </Dialog>
      {children}
    </TransactionDialogContext.Provider>
  );
};

export default TransactionDialogContextProvider;
