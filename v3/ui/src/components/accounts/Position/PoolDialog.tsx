import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Text,
  Box,
  Link,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Radio,
  Button,
  RadioGroup,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useUpdatePool } from '../../../hooks/useUpdatePool';
import { poolsData } from '../../../utils/constants';
import { poolsState } from '../../../utils/state';
import { CollateralType } from '../../../utils/types';

interface Props {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
  collateralAmount: number;
  debt: number;
  refetch: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const PoolDialog: FC<Props> = ({
  isOpen,
  onClose,
  poolId,
  collateralAmount,
  accountId,
  collateral,
  debt,
}) => {
  const navigate = useNavigate();
  const pools = useRecoilValue(poolsState);
  const [pool, setPool] = useState(poolId);
  const { exec, isValid, isLoading } = useUpdatePool(
    {
      collateral,
      poolId,
      accountId,
    },
    collateralAmount,
    pool,
    () => navigate(`/accounts/${accountId}`)
  );
  const updatePool = (newPool: string) => {
    if (debt <= 0) setPool(newPool);
  };

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Change Pool</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="6">Select a pool to participate in with this staking position:</Text>
          <RadioGroup value={pool} onChange={setPool}>
            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
              onClick={() => updatePool('0')}
            >
              <Box>
                <Radio disabled={debt > 0} value="0" size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  None
                </Heading>
              </Box>
            </Flex>
            {pools.map((poolId) => (
              <Flex
                key={poolId}
                alignItems="center"
                mb="2.5"
                pb="2.5"
                borderBottom="1px solid rgba(255,255,255,0.3)"
                onClick={() => updatePool(poolId)}
              >
                <Box>
                  <Radio disabled={debt > 0} value={poolId} size="lg" colorScheme="orange" />
                </Box>
                <Box flex="1" pl="3">
                  <Heading size="sm" mb="0.5">
                    {poolsData[poolId]?.name}
                  </Heading>
                  <Text fontSize="xs" display="block" color="gray.400">
                    Pool #{poolId}{' '}
                    <RouterLink to={`/pools/${poolId}`}>
                      <Link
                        color="cyan.500"
                        ml="1"
                        display="inline-block"
                        transform="translateY(-2px)"
                      >
                        <ExternalLinkIcon />
                      </Link>
                    </RouterLink>
                  </Text>
                </Box>
                <Box ml="auto" textAlign="right">
                  <Text fontSize="xs" display="block" color="gray.400">
                    X% Projected Fees APY
                  </Text>
                  <Text fontSize="xs" display="block" color="gray.400">
                    X% Projected Rewards APY
                  </Text>
                </Box>
              </Flex>
            ))}

            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
            >
              <Box>
                <Radio value={poolId} size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  Perpetual Futures
                </Heading>
                <Text fontSize="xs" display="block" color="gray.400">
                  Pool #2
                  <RouterLink to={`/pools/${poolId}`}>
                    <Link
                      color="cyan.500"
                      ml="1"
                      display="inline-block"
                      transform="translateY(-2px)"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </RouterLink>
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="xs" display="block" color="gray.400">
                  X% Projected Fees APY
                </Text>
                <Text fontSize="xs" display="block" color="gray.400">
                  X% Projected Rewards APY
                </Text>
              </Box>
            </Flex>

            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
            >
              <Box>
                <Radio value={poolId} size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  Spot Synths
                </Heading>
                <Text fontSize="xs" display="block" color="gray.400">
                  Pool #3
                  <RouterLink to={`/pools/${poolId}`}>
                    <Link
                      color="cyan.500"
                      ml="1"
                      display="inline-block"
                      transform="translateY(-2px)"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </RouterLink>
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="xs" display="block" color="gray.400">
                  X% Projected Fees APY
                </Text>
                <Text fontSize="xs" display="block" color="gray.400">
                  X% Projected Rewards APY
                </Text>
              </Box>
            </Flex>

            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
            >
              <Box>
                <Radio value={poolId} size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  Forex
                </Heading>
                <Text fontSize="xs" display="block" color="gray.400">
                  Pool #4
                  <RouterLink to={`/pools/${poolId}`}>
                    <Link
                      color="cyan.500"
                      ml="1"
                      display="inline-block"
                      transform="translateY(-2px)"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </RouterLink>
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="xs" display="block" color="gray.400">
                  X% Projected Fees APY
                </Text>
                <Text fontSize="xs" display="block" color="gray.400">
                  X% Projected Rewards APY
                </Text>
              </Box>
            </Flex>
          </RadioGroup>

          <Button
            isLoading={isLoading}
            disabled={!isValid || debt > 0}
            onClick={exec}
            w="100%"
            my="5"
          >
            Update Pool
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
