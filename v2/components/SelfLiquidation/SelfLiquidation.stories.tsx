import { SelfLiquidationUi } from './SelfLiquidation';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@chakra-ui/react';

export default {
  title: 'SelfLiquidationUi',
  component: SelfLiquidationUi,
} as ComponentMeta<typeof SelfLiquidationUi>;

const Template: ComponentStory<typeof SelfLiquidationUi> = (_args) => (
  <QueryClientProvider client={new QueryClient()} contextSharing={true}>
    <Box maxW={900}>
      <SelfLiquidationUi {..._args} />
    </Box>
  </QueryClientProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  targetCRatioPercentage: 300,
  currentCRatioPercentage: 300,
  selfLiquidationPenalty: 0.2,
  selfLiquidationPenaltySNX: 100,
  selfLiquidationPenaltyDollar: 200,
  onSelfLiquidation: () => {},
  gasError: null,
  isGasEnabledAndNotFetched: false,
};
