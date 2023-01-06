import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
} from '@chakra-ui/react';
import { usePools } from '@snx-v3/usePools';
import { FC, useState } from 'react';
import { generatePath, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUpdatePool } from '../../../hooks/useUpdatePool';
import { CollateralType } from '@snx-v3/useCollateralTypes';

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
  const { data: pools } = usePools();
  const [pool, setPool] = useState(poolId);
  const { exec, isValid, isLoading } = useUpdatePool(
    {
      collateral,
      poolId,
      accountId,
    },
    collateralAmount,
    pool,
    () => navigate(generatePath('/accounts/:accountId', { accountId }))
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
          <Text mb="6">Select a pool to participate in with this depositing position:</Text>
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
            {pools?.map(({ id, name }) => (
              <Flex
                key={id}
                alignItems="center"
                mb="2.5"
                pb="2.5"
                borderBottom="1px solid rgba(255,255,255,0.3)"
                onClick={() => updatePool(id)}
              >
                <Box>
                  <Radio disabled={debt > 0} value={id} size="lg" colorScheme="orange" />
                </Box>
                <Box flex="1" pl="3">
                  <Heading size="sm" mb="0.5">
                    {name}
                  </Heading>
                  <Text fontSize="xs" display="block" color="gray.400">
                    Pool #{id}{' '}
                    <RouterLink to={generatePath('/pools/:poolId', { poolId: id })}>
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
                  <RouterLink to={generatePath('/pools/:poolId', { poolId })}>
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
                  <RouterLink to={generatePath('/pools/:poolId', { poolId })}>
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
                  <RouterLink to={generatePath('/pools/:poolId', { poolId })}>
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
