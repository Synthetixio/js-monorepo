import { fundsData } from '../../../utils/constants';
import { useContract } from '../../../utils/hooks/useContract';
import StakerOption from './StakerOption';
import {
  Box,
  Heading,
  Text,
  Input,
  Flex,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Radio,
  RadioGroup,
  Spacer,
} from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useContractReads } from 'wagmi';

const NO_FUND_TAB_INDEX = 1;

type PropsType = {
  onClose: () => void;
};

export default function EditPosition({ onClose }: PropsType) {
  const snxProxy = useContract('synthetix.Proxy');

  const snxContractData = {
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
  };

  const { data } = useContractReads({
    contracts: [
      {
        ...snxContractData,
        functionName: 'getPreferredFund',
      },
      {
        ...snxContractData,
        functionName: 'getApprovedFunds',
      },
    ],
  });

  const funds = data
    ? [
        data[0].toString(),
        ...data[1].filter((id) => !id.eq(data[0])).map((fundId) => fundId.toString()),
      ]
    : [];

  const { setValue } = useFormContext();
  const fundValue = useWatch({
    name: 'fundId',
  });

  const [selectedFund, setSelectedFund] = useState<string>();

  return (
    <>
      <Box>
        <Tabs
          onChange={(index) => {
            // user switch to no fund tab
            // if more tabs are added, this needs to change
            if (index === NO_FUND_TAB_INDEX) {
              setSelectedFund('0');
            }
          }}
          isFitted
          defaultIndex={fundValue === '0' ? NO_FUND_TAB_INDEX : 0}
        >
          <TabList>
            <Tab>Join Fund</Tab>
            <Tab tabIndex={100}>No Fund</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RadioGroup
                onChange={(v) => {
                  setSelectedFund(v);
                }}
                value={selectedFund || fundValue}
              >
                {funds.map((option) => {
                  const { name } = fundsData[option];
                  return (
                    <StakerOption
                      checked={selectedFund ? selectedFund : fundValue}
                      name={name}
                      value={option}
                      key={option}
                    />
                  );
                })}
                {/*
              <Flex mb="2" pt="1">
                <Box pt="2">
                  <Radio size="lg" name="custom" colorScheme="orange" />
                </Box>
                <Box flex="1" pl="3">
                  <Heading size="sm" mb="0.5">
                    Custom
                  </Heading>
                  <Text fontSize="xs" display="block" color="gray.400">
                    Follow the staking position of another fund
                  </Text>
                  {delegate == "custom" && (
                    <Box>
                      <Text opacity="0.6" fontSize="sm" mt="1.5" mb="1">
                        Fund ID
                      </Text>
                      <Input size="sm" />
                    </Box>
                  )}
                </Box>
              </Flex>
                  */}
              </RadioGroup>
            </TabPanel>
            {/*
          <TabPanel>
            <Heading
              size="xs"
              mb="3"
              textTransform="uppercase"
              fontWeight="300"
              letterSpacing="1.5px"
            >
              Crypto
            </Heading>
            <SynthOption ticker="sBTC" name="Synthetic Bitcoin" />
            <SynthOption ticker="sETH" name="Synthetic Ether" />
            <SynthOption ticker="sSOL" name="Synthetic Solana" />
            <Heading
              size="xs"
              mb="3"
              textTransform="uppercase"
              fontWeight="300"
              letterSpacing="1.5px"
            >
              Forex
            </Heading>
            <Text mb="4">...</Text>
            <Heading
              size="xs"
              mb="3"
              textTransform="uppercase"
              fontWeight="300"
              letterSpacing="1.5px"
            >
              Commodities
            </Heading>
            <Text mb="4">...</Text>
            <Heading
              size="xs"
              mb="3"
              textTransform="uppercase"
              fontWeight="300"
              letterSpacing="1.5px"
            >
              Custom
            </Heading>
            <Flex mb="6">
              <Input placeholder="0x00000000000000000000000000000000" />
              <Button colorScheme="blue" ml="4">
                Add Synth
              </Button>
            </Flex>

            <Flex>
              <Heading size="sm">Totals:</Heading>
              <Spacer />
              <Text fontSize="xs">
                Projected Rewards: <strong>20% APY</strong> (SNX)
              </Text>
              <Spacer />
              <Text fontSize="xs">
                Projected Fees: <strong>20% APY</strong> (sUSD)
              </Text>
            </Flex>
          </TabPanel>
          */}
            <TabPanel>
              <Text textAlign="center" mt="9" mb="3">
                This collateral will not be delegated to a fund.
              </Text>
              <Text textAlign="center" mb="6" mx="12" fontSize="sm" color="gray.500">
                This is typically used to take out a loan of sUSD against your collateral. Your
                C-Ratio is only subject to fluctuations based on the value of your collateral, but
                you receive no fees or rewards.
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Button
        w="100%"
        colorScheme="blue"
        onClick={() => {
          selectedFund && setValue('fundId', selectedFund);
          onClose();
        }}
      >
        Update
      </Button>
    </>
  );
}
