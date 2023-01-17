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
import { useState } from 'react';
import { generatePath, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUpdatePool } from './useUpdatePool';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';

export function PoolDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);

  const { data: pools } = usePools();
  const [poolId, setPoolId] = useState(params.poolId);

  const liquidityPosition = useLiquidityPosition({
    accountId: params.accountId,
    poolId: params.poolId,
    tokenAddress: collateralType?.tokenAddress,
  });

  const { exec, isValid, isLoading } = useUpdatePool({
    collateral: collateralType,
    poolId: params.poolId,
    accountId: params.accountId,
    collateralAmount: liquidityPosition.data?.collateralAmount,
    newPoolId: poolId,
    onSuccess: () => {
      if (params.accountId) {
        navigate(generatePath('/accounts/:accountId', { accountId: params.accountId }));
      }
    },
  });

  const hasDebt = liquidityPosition.data && liquidityPosition.data.debt.gt(0);

  const updatePool = (newPool: string) => {
    if (!hasDebt) {
      setPoolId(newPool);
    }
  };

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Change Pool</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="6">Select a pool to participate in with this depositing position:</Text>
          <RadioGroup value={poolId} onChange={setPoolId}>
            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
              onClick={() => updatePool('0')}
            >
              <Box>
                <Radio disabled={hasDebt} value="0" size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  None
                </Heading>
              </Box>
            </Flex>
            {pools?.map((pool) => (
              <Flex
                key={pool.id}
                alignItems="center"
                mb="2.5"
                pb="2.5"
                borderBottom="1px solid rgba(255,255,255,0.3)"
                onClick={() => updatePool(pool.id)}
              >
                <Box>
                  <Radio disabled={hasDebt} value={pool.id} size="lg" colorScheme="orange" />
                </Box>
                <Box flex="1" pl="3">
                  <Heading size="sm" mb="0.5">
                    {pool.name}
                  </Heading>
                  <Text fontSize="xs" display="block" color="gray.400">
                    Pool #{pool.id}{' '}
                    <RouterLink to={generatePath('/pools/:poolId', { poolId: pool.id })}>
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
          </RadioGroup>

          <Button
            isLoading={isLoading}
            disabled={!isValid || hasDebt}
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
}
