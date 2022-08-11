import Burn from './Manage/Burn';
import Custom from './Manage/Custom';
import Mint from './Manage/Mint';
import Preview from './Manage/Preview';
import Stake from './Manage/Stake';
import Unstake from './Manage/Unstake';
import { Text, Box, Button, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

export default function Manage() {
  return (
    <Box mb="2">
      <Text mt="2" mb="6">
        Manage your staking position by adjusting your collateral and debt.
      </Text>

      <Tabs size="sm" variant="soft-rounded" colorScheme="blue">
        <TabList justifyContent="space-between">
          <Tab>Maintain C-Ratio</Tab>
          <Tab>Borrow snxUSD</Tab>
          <Tab>Repay snxUSD</Tab>
          <Tab>Custom</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text fontSize="sm" mb="4">
              <strong>
                If your C-Ratio drops below the minimum (150%), you may be liquidated and lose your
                collateral.
              </strong>{' '}
              There are two ways to increase your C-Ratio:
            </Text>
            <Stake />
            <Burn />
          </TabPanel>
          <TabPanel>
            <Stake />
            <Mint />
          </TabPanel>
          <TabPanel>
            <Burn />
            <Unstake />
          </TabPanel>
          <TabPanel>
            <Custom />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Preview />

      <Box px="4">
        <Button colorScheme="blue" size="lg" width="100%" mb="2">
          Update Position
        </Button>
      </Box>
    </Box>
  );
}
