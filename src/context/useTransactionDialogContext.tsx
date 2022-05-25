import { Dialog, Spinner } from "components";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { providers } from "ethers";
import { TransactionNotifier } from "@synthetixio/transaction-notifier";

type TxState = "signing" | "mining" | "failed" | "confirmed" | "error";

interface TransactionDialogContextType {
  setTxHash: React.Dispatch<string | undefined>;
  visible: boolean;
  setContent: React.Dispatch<React.SetStateAction<ReactNode | undefined>>;
  state: TxState;
}
const Svg = ({ txState }: Record<"txState", TxState>) => {
  return (
    <svg fill="none" height="94" viewBox="0 0 94 94" width="94" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1447_13624)">
        <circle
          cx="47"
          cy="47"
          r="31"
          stroke={txState === "mining" || txState === "signing" ? "#FFD75C" : "red"}
          strokeWidth="2"
        />
      </g>
      <circle
        cx="59"
        cy="47"
        fill={txState === "mining" || txState === "signing" ? "#FFD75C" : "red"}
        r="4"
      />
      <circle
        cx="47"
        cy="45"
        fill={txState === "mining" || txState === "signing" ? "#FFD75C" : "red"}
        r="4"
      />
      <circle
        cx="35"
        cy="47"
        fill={txState === "mining" || txState === "signing" ? "#FFD75C" : "red"}
        r="4"
      />
      <defs>
        <filter
          id="filter0_d_1447_13624"
          x="0"
          y="0"
          width="94"
          height="94"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.843137 0 0 0 0 0.360784 0 0 0 0.6 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1447_13624" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1447_13624"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

const TransactionDialogContext = createContext<unknown>(null);

export const useTransactionModalContext = () => {
  return useContext(TransactionDialogContext) as TransactionDialogContextType;
};
const TransactionDialogContextProvider: React.FC<{
  provider: providers.Web3Provider;
  children: React.ReactNode;
}> = ({ children, provider }) => {
  const txNotifier = new TransactionNotifier(provider);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ReactNode | undefined>(undefined);
  const [state, setState] = useState<TxState>("signing");
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (txHash) {
      setVisible(true);
      setState("signing");
      const emitter = txNotifier.hash(txHash);
      emitter.on("txConfirmed", () => setState("confirmed"));
      emitter.on("txError", () => setState("error"));
      emitter.on("txFailed", () => setState("failed"));
      emitter.on("txSent", () => setState("mining"));
    }
  }, [txHash]);

  return (
    <TransactionDialogContext.Provider
      value={{
        visible,
        state,
        setContent,
        setTxHash
      }}
    >
      <Dialog open={visible} onClose={() => setVisible(false)} disableClose>
        <div className="ui-flex ui-flex-col ui-items-center">
          <Svg txState={state} />
          <h4 className="ui-tg-title-h4">Transaction Pending</h4>
          <span className="ui-tg-caption ui-text-center ui-text-gray-500">
            Follow the prompts of your wallet to authorize the transaction.
          </span>
          <div className="ui-bg-black ui-rounded ui-w-[314px] ui-h-[73px] ui-my-6">{content}</div>
          <Spinner className="ui-mr-2" variant="secondary" />
        </div>
      </Dialog>
      {children}
    </TransactionDialogContext.Provider>
  );
};

export default TransactionDialogContextProvider;
