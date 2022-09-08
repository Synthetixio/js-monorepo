import React from 'react';
import { TransactionModal } from './TransactionModal';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { Spinner, Progress, Flex, Text, Button, Divider } from '@chakra-ui/react';
import { SUSDIcon, TransactionCompleted, TransactionPending } from '@snx-v2/icons';
import { ExternalLink } from '../ExternalLink/ExternalLink';

export default {
  title: 'TransactionModal',
  component: TransactionModal,
} as ComponentMeta<typeof TransactionModal>;

const Template: ComponentStory<typeof TransactionModal> = (props) => {
  const [{ isOpen }, updateArgs] = useArgs();
  const toggle = () => updateArgs({ isOpen: !isOpen });
  return (
    <div>
      <Button onClick={() => toggle()}>{isOpen ? 'Close' : 'Open'}</Button>
      <TransactionModal {...props} isOpen={isOpen} onClose={toggle} />
    </div>
  );
};

export const CollectRewards = Template.bind({});
CollectRewards.args = {
  isOpen: true,
  onClose: () => {},
  title: 'Collect Rewards',
  children: (
    <div>
      <Progress mt="2" value={80} variant="white" />
      <Flex mt="1" justifyContent="space-between">
        <Text fontSize="xs" color="whiteAlpha.600" fontWeight={700}>
          Time Remaining
        </Text>
        <Text fontSize="xs" color="success" fontWeight={700}>
          07:12:35
        </Text>
      </Flex>
      <Flex flexDirection="column" alignItems="center" bg="black" pt="4" pb="4" mt="4">
        <Text fontWeight={500} color="success">
          Claimable
        </Text>
        <Text fontWeight={500}>100 SNX</Text>
      </Flex>
      <Flex flexDirection="column">
        <Button mt="4" width="full">
          Claim
        </Button>
        <Divider borderColor="gray.900" mt="4" mb="4" orientation="horizontal" />
        <Button fontSize="xs" textAlign="center" variant="link">
          Get Info
        </Button>
      </Flex>
    </div>
  ),
  icon: <SUSDIcon alignSelf="center" width="64px" height="64px" />,
};
export const CollectRewardsPending = Template.bind({});

CollectRewardsPending.args = {
  isOpen: true,
  onClose: () => {},
  title: 'Transaction Pending',
  children: (
    <div>
      <Flex flexDirection="column" alignItems="center" bg="black" pt="4" pb="4" mt="4">
        <Text fontWeight={500} color="gray.600">
          Claimed
        </Text>
        <Text fontWeight={500}>100 SNX</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" bg="black" pt="4" pb="4" mt="4">
        <Spinner size="sm" mr="3" />
        <Text color="cyan.500" fontWeight={500}>
          Loading
        </Text>
      </Flex>
      <Divider borderColor="gray.900" mt="4" mb="4" orientation="horizontal" />
      <Flex justifyContent="center">
        <ExternalLink fontSize="sm">View Etherscan</ExternalLink>
      </Flex>
    </div>
  ),
  icon: <TransactionPending />,
};
export const CollectRewardsCompleted = Template.bind({});

CollectRewardsCompleted.args = {
  isOpen: true,
  onClose: () => {},
  title: 'Transaction Completed',
  children: (
    <div>
      <Flex flexDirection="column" alignItems="center" bg="black" pt="4" pb="4" mt="4">
        <Text fontWeight={500} color="gray.600">
          Claimed
        </Text>
        <Text fontWeight={500}>100 SNX</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mt="2">
        <Button>Done</Button>
      </Flex>
      <Divider borderColor="gray.900" mt="4" mb="4" orientation="horizontal" />
      <Flex justifyContent="center">
        <ExternalLink fontSize="sm">View Etherscan</ExternalLink>
      </Flex>
    </div>
  ),
  icon: <TransactionCompleted />,
};
