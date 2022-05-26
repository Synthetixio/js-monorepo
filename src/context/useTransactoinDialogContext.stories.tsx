import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'components';
import { providers } from 'ethers';
import { useEffect } from 'react';

import TransactionDialogContextProvider, {
  useTransactionModalContext
} from './useTransactionDialogContext';

export default {
  title: 'Transaction Dialog',
  component: TransactionDialogContextProvider,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof TransactionDialogContextProvider>;

const Template: ComponentStory<typeof TransactionDialogContextProvider> = () => {
  return (
    <TransactionDialogContextProvider
      provider={providers.getDefaultProvider() as providers.Web3Provider}
    >
      <HelperComponent />
    </TransactionDialogContextProvider>
  );
};

const HelperComponent = () => {
  const { visible, setTxHash, state, setVisible, setContent } = useTransactionModalContext();
  useEffect(() => {
    setContent(<div>GENERIC CONTENT</div>);
  }, [setContent]);
  return (
    <div style={{ background: 'white' }}>
      <div>is Dialog active: {visible ? 'yes' : 'no'}</div>
      <div>is Dialog active: {state?.toString()}</div>
      <Button
        onClick={() => {
          setTxHash('0x117e55f72079b19e182234de4830110842fbf5f9fc0fcb1971a5ffd9b52d30b6');
        }}
      >
        Send Transaction
      </Button>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Toggle Dialog
      </Button>
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = { children: <div style={{ background: 'white' }}>rest of the app</div> };
