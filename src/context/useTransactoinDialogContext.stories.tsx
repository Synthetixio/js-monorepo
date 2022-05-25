import { ComponentMeta, ComponentStory } from "@storybook/react";

import TransactionDialogContextProvider, {
  useTransactionModalContext
} from "./useTransactionDialogContext";

import { providers } from "ethers";

export default {
  title: "Transaction Dialog",
  component: TransactionDialogContextProvider,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof TransactionDialogContextProvider>;

const Template: ComponentStory<typeof TransactionDialogContextProvider> = ({ children }) => {
  return (
    <TransactionDialogContextProvider
      provider={providers.getDefaultProvider() as providers.Web3Provider}
    >
      <HelperComponent />
    </TransactionDialogContextProvider>
  );
};

const HelperComponent = () => {
  const { visible, setTxHash, state, setContent } = useTransactionModalContext();
  return (
    <div style={{ background: "white" }}>
      <div>is Dialog active: {visible ? "yes" : "no"}</div>
      <div>is Dialog active: {state?.toString()}</div>
      <button
        onClick={() => {
          setTxHash("0x054620b7cab0ee0c950556945d895e9d7f3e0d1532fda419a32a96bd8894c02b");
        }}
      >
        Toggle visibility
      </button>
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = { children: <div style={{ background: "white" }}>rest of the app</div> };
