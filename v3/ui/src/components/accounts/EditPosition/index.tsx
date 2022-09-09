import {
  Box,
  Button,
  RadioGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { poolsData } from '../../../utils/constants';
import { poolsState } from '../../../utils/state';
import StakerOption from './StakerOption';

const NO_POOL_TAB_INDEX = 1;

type PropsType = {
  onClose: () => void;
};

export default function EditPosition({ onClose }: PropsType) {
  const pools = useRecoilValue(poolsState);
  const { setValue } = useFormContext();
  const poolValue = useWatch({
    name: 'poolId',
  });

  const [selectedPool, setSelectedPool] = useState<string>();

  return (
    <>
      <Box>
        <Tabs
          onChange={(index) => {
            // user switch to no pool tab
            // if more tabs are added, this needs to change
            if (index === NO_POOL_TAB_INDEX) {
              setSelectedPool('0');
            }
          }}
          isFitted
          defaultIndex={poolValue === '0' ? NO_POOL_TAB_INDEX : 0}
        >
          <TabList>
            <Tab>Join Pool</Tab>
            <Tab tabIndex={100}>No Pool</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RadioGroup
                onChange={(v) => {
                  setSelectedPool(v);
                }}
                value={selectedPool || poolValue}
              >
                {pools.map((option) => {
                  const { name } = poolsData[option];
                  return (
                    <StakerOption
                      checked={selectedPool ? selectedPool : poolValue}
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
                    Follow the staking position of another pool
                  </Text>
                  {delegate == "custom" && (
                    <Box>
                      <Text opacity="0.6" fontSize="sm" mt="1.5" mb="1">
                        pool ID
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
                This collateral will not be delegated to a pool.
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
          selectedPool && setValue('poolId', selectedPool);
          onClose();
        }}
      >
        Update
      </Button>
    </>
  );
}
