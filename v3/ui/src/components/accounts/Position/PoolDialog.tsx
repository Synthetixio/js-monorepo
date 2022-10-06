import { ExternalLinkIcon, InfoIcon } from '@chakra-ui/icons';
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
  Tooltip,
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
              onClick={() => setPool('0')}
            >
              <Box>
                <Radio value="0" size="lg" colorScheme="orange" />
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
                onClick={() => setPool(poolId)}
              >
                <Box>
                  <Radio value={poolId} size="lg" colorScheme="orange" />
                </Box>
                <Box flex="1" pl="3">
                  <Heading size="sm" mb="0.5">
                    {poolsData[poolId]?.name}
                  </Heading>
                  <Text fontSize="xs" display="block" color="gray.400">
                    Pool #{poolId}{' '}
                    <RouterLink to={`/pools/${poolId}`}>
                      <Link
                        color="blue.400"
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
                    20% Projected Fees APY
                  </Text>
                  <Text fontSize="xs" display="block" color="gray.400">
                    70% Projected Rewards APY
                  </Text>
                </Box>
              </Flex>
            ))}
          </RadioGroup>
          <Heading size="sm" mb="2" mt="6">
            Burn Pool Shares
          </Heading>
          <Text>
            To leave the pool you’re currently in, you need to burn your pool shares.{' '}
            <em>t.b.d.</em>
            {debt > 0 && (
              <Tooltip color="white" label="You Can't leave a pool if you have debt">
                <InfoIcon ml="2" transform="translateY(-1px)" color="red.400" />
              </Tooltip>
            )}
          </Text>

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
