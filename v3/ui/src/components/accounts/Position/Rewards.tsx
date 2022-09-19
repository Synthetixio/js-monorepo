import { QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Link,
  Input,
  Checkbox,
  SimpleGrid,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
} from '@chakra-ui/react';
import { BigNumber, utils } from 'ethers';
import { FC, useState } from 'react';
import { useContractWrite } from 'wagmi';
import { useContract, useSnxProxy } from '../../../hooks';
import { useGetStakingRewards } from '../../../hooks/useStakingReward';
import { useTokenBalance } from '../../../hooks/useTokenBalance';
import { contracts } from '../../../utils/constants';
import { CollateralType } from '../../../utils/types';
import { Balance } from '../Stake/Balance';

interface Props {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
}

export const Rewards: FC<Props> = ({ accountId, poolId, collateral }) => {
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const { data: rewards } = useGetStakingRewards(accountId, poolId, collateral);
  const snxProxy = useSnxProxy();
  const eSnxProxy = useContract(contracts.ESNX_PROXY);
  const balance = useTokenBalance(eSnxProxy?.address);

  const total = (rewards || []).reduce((prv, curr) => curr.add(prv), BigNumber.from(0));

  const { writeAsync: claim, isLoading: claimLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    functionName: 'claimRewards',
    args: [poolId, collateral.address, accountId],
  });

  return (
    <Box>
      <Text mt="2" mb="6">
        In addition to fees, you’re earning eSNX rewards by backing synthetic assets with SNX tokens
        through the Spartan Council pool.
      </Text>
      <Box mb="10">
        <Heading size="md" mb="1">
          Claim eSNX
        </Heading>
        <Text mb="4">
          You’re currently earning approximately 10.2 eSNX per week. You can earn more eSNX by
          staking additional SNX or increasing your staking leverage.
        </Text>
        <Flex alignItems="center">
          <Button
            disabled={total.isZero()}
            onClick={() => claim()}
            isLoading={claimLoading}
            colorScheme="blue"
          >
            Claim {Number(utils.formatUnits(total, 18)).toFixed(2)} eSNX
          </Button>
          <Text ml="5" fontWeight="semibold" fontSize="sm">
            <Link color="blue.400">
              <QuestionOutlineIcon mr="1.5" transform="translateY(-1px)" />
              How are eSNX rewards calculated?
            </Link>
          </Text>
        </Flex>
      </Box>
      <Box mb="10">
        <Heading size="md" mb="1">
          Stake eSNX
        </Heading>
        <Text mb="4">
          Convert eSNX to SNX by staking it. Select a longer vesting period for a better conversion
          rate from eSNX to SNX.
        </Text>
        <SimpleGrid columns={2} spacing={6} mb={5}>
          <Box>
            <Box bg="gray.900" mb="4" p="6" pb="4" borderRadius="12px">
              <form>
                <Flex mb="3">
                  <Input
                    flex="1"
                    type="number"
                    border="none"
                    placeholder="0.0"
                    // value={null}
                    onChange={() => null}
                  />
                </Flex>
              </form>
              <Flex alignItems="center">
                <Balance balance={balance.value} decimals={balance.decimals} symbol="eSNX" />
              </Flex>
            </Box>
            <Checkbox defaultChecked>Claim and stake 534.23 eSNX</Checkbox>
          </Box>
          <Box>
            <Text fontSize="sm" mb="4" fontWeight="semibold">
              Select Vesting Period
            </Text>
            <Slider
              mb="10"
              id="slider"
              defaultValue={5}
              min={0}
              max={100}
              colorScheme="blue"
              onChange={(v) => setSliderValue(v)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <SliderMark value={25} mt="1" transform="translateX(-50%)" fontSize="sm">
                25 days
              </SliderMark>
              <SliderMark value={50} mt="1" transform="translateX(-50%)" fontSize="sm">
                50 days
              </SliderMark>
              <SliderMark value={75} mt="1" transform="translateX(-50%)" fontSize="sm">
                75 days
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="teal.500"
                color="white"
                placement="top"
                isOpen={showTooltip}
                label={`${sliderValue}%`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
            <Text>
              600 eSNX with a 30 day vesting period will be converted to{' '}
              <strong>400 staked SNX.</strong>
              <QuestionOutlineIcon ml="1.5" transform="translateY(-2px)" opacity="0.9" />
            </Text>
          </Box>
        </SimpleGrid>

        <Button colorScheme="blue" w="100%">
          Stake 600 eSNX as 400 SNX
        </Button>
      </Box>
      <Box mb="10">
        <Heading size="md" mb="3">
          Vesting Schedule
        </Heading>
        <Box background="whiteAlpha.300" textAlign="center" p="14" mb="3">
          Beautiful chart of vesting curve
        </Box>
        <Text fontSize="sm">
          Your escrowed SNX cannot be unstaked until it vests. Staking additional eSNX will merge
          the new schedule into the schedule above.
        </Text>
      </Box>
    </Box>
  );
};
