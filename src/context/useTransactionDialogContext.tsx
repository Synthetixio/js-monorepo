import { TransactionNotifier } from '@synthetixio/transaction-notifier';
import { Dialog, Spinner } from 'components';
import TxStateSvg from 'components/Icons/TxState';
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

export type TxState = 'signing' | 'mining' | 'failed' | 'confirmed' | 'error';

interface TransactionDialogContextType {
  setTxHash: Dispatch<string | undefined>;
  visible: boolean;
  setContent: Dispatch<SetStateAction<ReactNode | undefined>>;
  state: TxState;
  setVisible: Dispatch<SetStateAction<boolean>>;
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

  const renderText = () => {
    switch (state) {
      case 'confirmed':
        return (
          <>
            <h4 className="ui-tg-title-h4">Transaction Confirmed</h4>
            <span className="ui-tg-caption ui-text-center ui-text-gray-500">
              You can now proceed with the dApp.
            </span>
          </>
        );
      case 'error':
      case 'failed':
        return (
          <>
            <h4 className="ui-tg-title-h4">Transaction Failed</h4>
            <span className="ui-tg-caption ui-text-center ui-text-gray-500">
              While processing your transaction an error occurred.
            </span>
          </>
        );
      case 'signing':
        return (
          <>
            <h4 className="ui-tg-title-h4">Transaction Signing</h4>
            <span className="ui-tg-caption ui-text-center ui-text-gray-500">
              Follow the prompts of your wallet provider to authorize the transaction.
            </span>
          </>
        );
      default:
        return (
          <>
            <h4 className="ui-tg-title-h4">Transaction Pending</h4>
            <span className="ui-tg-caption ui-text-center ui-text-gray-500">
              Waiting for transaction to be included into the next block.
            </span>
          </>
        );
    }
  };

  return (
    <TransactionDialogContext.Provider
      value={{
        visible,
        setVisible,
        state,
        setContent,
        setTxHash
      }}
    >
      <Dialog disableClose open={visible} onClose={() => setVisible(false)}>
        <div className="ui-flex ui-flex-col ui-items-center">
          <TxStateSvg txState={state} />
          {renderText()}
          {content && (
            <div className="ui-bg-black ui-rounded ui-w-[314px] ui-h-[73px] ui-my-6">{content}</div>
          )}
          {state === 'mining' && <Spinner className="ui-mr-2" variant="secondary" />}
        </div>
      </Dialog>
      {children}
    </TransactionDialogContext.Provider>
  );
};

export default TransactionDialogContextProvider;
