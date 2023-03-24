import { DebtPoolTableUi } from './DebtPoolTable';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'DebtPoolTable',
  component: DebtPoolTableUi,
} as ComponentMeta<typeof DebtPoolTableUi>;

const Template: ComponentStory<typeof DebtPoolTableUi> = (props) => <DebtPoolTableUi {...props} />;

export const Primary = Template.bind({});

Primary.args = {
  data: [
    { name: 'sETH', positionInUsd: 1500000, poolProportion: 0.6 },
    { name: 'sBTC', positionInUsd: 1000000, poolProportion: 0.4 },
  ],
};
