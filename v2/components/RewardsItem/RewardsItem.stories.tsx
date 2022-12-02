import { RewardsItemUI } from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoOutline, SNXIcon } from '@snx-v2/icons';
import { Badge } from '@chakra-ui/react';

export default {
  title: 'RewardsItem',
  component: RewardsItemUI,
} as ComponentMeta<typeof RewardsItemUI>;

const Template: ComponentStory<typeof RewardsItemUI> = (_args) => <RewardsItemUI {..._args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});

const date = new Date();
date.setDate(date.getDate() + 3);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  isLoading: false,
  title: 'Synthetix',
  description: 'Staking Rewards',
  apyReturn: '12%',
  stakedBalance: '5,000,000.00 SNX',
  Icon: () => <SNXIcon height="40px" width="40px" />,
  endDate: date,
  RewardBalance: () => <>5,000,000.00 SNX</>,
  RewardsBadge: () => (
    <Badge py={0.5} px={1} fontSize="2xs" variant="warning" mt={0.5} borderRadius="md">
      <InfoOutline color="warning" mb="2.5px" mr="2px" height="12px" width="12px" />
      Adjust to Collect Rewards
    </Badge>
  ),
};
