import { EditIcon, ExternalLinkIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Td,
  Text,
  Tooltip,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { Link as RouterLink } from 'react-router-dom';
import { formatValue } from '../../../utils/helpers';
import { currency } from '../../../utils/currency';
import { StakingPositionType } from '../../../utils/types';
import { poolsData } from '../../../utils/constants';
import { PoolDialog } from '../Position/PoolDialog';
import { FC } from 'react';

interface Props {
  position: StakingPositionType;
  refetch: () => void;
}

export const StakingPosition: FC<Props> = ({ position, refetch }) => {
  // If the connected wallet doesn’t own this account token, remove/disable the interactivity

  const { isOpen: isOpenFund, onOpen: onOpenFund, onClose: onCloseFund } = useDisclosure();
  const { isOpen: isOpenDebt, onOpen: onOpenDebt, onClose: onCloseDebt } = useDisclosure();

  const { collateralAmount: collateralAmountBN, collateralType, cRatio, debt } = position;

  const { decimals, price: priceBN, priceDecimals } = collateralType;

  const collateralAmount = formatValue(collateralAmountBN, decimals);
  const price = formatValue(priceBN!, priceDecimals!);
  const collateralValue = collateralAmount * price;

  return (
    <Tr>
      <Td py="4">
        <>
          ${collateralValue.toFixed(2)}
          <Text fontSize="xs" opacity="0.66" mt="1'">
            {collateralAmount.toFixed(0)} SNX
          </Text>
        </>
      </Td>
      <Td py="4">
        ${currency(debt.toString())}
        <Text fontSize="xs" mt="1'">
          <Link
            as={RouterLink}
            to="#"
            _hover={{ textDecoration: 'none' }}
            onClick={onOpenDebt}
            display="inline"
            color="blue.500"
          >
            Manage Debt
          </Link>
          <Modal size="2xl" isOpen={isOpenDebt} onClose={onCloseDebt}>
            <ModalOverlay />
            <ModalContent bg="black" color="white">
              <ModalHeader>Manage Debt</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box mb="8">
                  <Heading fontSize="lg" mb="1">
                    You have $0 of debt associated with this collateral.
                  </Heading>
                  <Text>
                    You have $0 of collateral associated with this debt, giving you an unlimted
                    C-Ratio. The value of your collateral fluctates with market conditions.{' '}
                    <em>
                      If your C-Ratio drops below 200% you may be liquidated and lose your
                      collateral.
                    </em>
                  </Text>
                </Box>

                <Box mb="8">
                  <Heading fontSize="lg" mb="1">
                    $0 of this debt has been accrued from the{' '}
                    <Text borderBottom="1px dotted rgba(255,255,255,0.8)" display="inline">
                      Spartan Council
                    </Text>{' '}
                    fund.
                  </Heading>
                  <Text>
                    This will fluctuate depending on the markets where this fund has allocated
                    liquidity.
                  </Text>
                </Box>

                <Box mb="4">
                  <Heading fontSize="lg" mb="4">
                    $0 of this debt has been accrued from minting and burning sUSD.
                  </Heading>
                  <SimpleGrid columns={2} spacing={4}>
                    <Box>
                      <Heading fontSize="md" mb="1">
                        Mint sUSD
                      </Heading>
                      <Text fontSize="sm" mb="1">
                        Increase your debt and harm your C-Ratio.
                      </Text>

                      <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
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
                            <Button
                              // isLoading={null}
                              // isDisabled={null}

                              ml="4"
                              px="8"
                              type="submit"
                            >
                              Mint
                            </Button>
                          </Flex>
                        </form>
                        <Flex alignItems="center">
                          <Box mr="auto">
                            <Text fontSize="xs">
                              Max Mint: $1,200
                              <Tooltip label="You can't mint sUSD that takes your C-Ratio below the target c-ratio of 300%.">
                                <QuestionOutlineIcon transform="translateY(-1.5px)" ml="1" />
                              </Tooltip>
                            </Text>
                          </Box>
                          <Link>
                            <Badge
                              as="button"
                              ml="3"
                              variant="outline"
                              transform="translateY(-2px)"
                            >
                              Use Max
                            </Badge>
                          </Link>
                        </Flex>
                      </Box>
                      <Text fontSize="sm">
                        This is effectively taking out a zero-interest loan against your collateral.
                      </Text>
                    </Box>

                    <Box>
                      <Heading fontSize="md" mb="1">
                        Burn sUSD
                      </Heading>
                      <Text fontSize="sm" mb="1">
                        Reduce your debt and improve your C-Ratio.
                      </Text>

                      <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
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
                            <Button
                              // isLoading={null}
                              // isDisabled={null}

                              ml="4"
                              px="8"
                              type="submit"
                            >
                              Burn
                            </Button>
                          </Flex>
                        </form>
                        <Flex alignItems="center">
                          <Box mr="auto">
                            <Text fontSize="xs">Balance: $2,000</Text>
                          </Box>
                          <Link>
                            <Badge
                              as="button"
                              ml="3"
                              variant="outline"
                              transform="translateY(-2px)"
                            >
                              Use Max
                            </Badge>
                          </Link>
                        </Flex>
                      </Box>
                      <Text fontSize="sm">
                        You can purchase sUSD from most major exchanges like{' '}
                        <Link
                          display="inline"
                          _hover={{ textDecoration: 'none' }}
                          borderBottom="1px dotted rgba(255,255,255,0.5)"
                        >
                          one we like
                        </Link>
                        .
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Text>
      </Td>
      <Td py="4">
        ${currency(cRatio.toString())}
        <Text fontSize="xs" opacity="0.66" mt="1'">
          {/*target here as well?*/}
          {formatValue(collateralType!.minimumCRatio!.mul(BigNumber.from(100)), 6).toFixed(0)}% Min.
        </Text>
      </Td>

      <Td>
        <Link
          as={RouterLink}
          to="/funds/example"
          _hover={{ textDecoration: 'none' }}
          display="inline"
          borderBottom="1px dotted rgba(255,255,255,0.5)"
        >
          {poolsData[position.poolId.toString()]?.name}
        </Link>
        <Link color="blue.400" ml="1">
          <EditIcon onClick={onOpenFund} style={{ transform: 'translateY(-2px)' }} />
        </Link>

        <PoolDialog
          collateralAmount={collateralAmount}
          accountId={position.accountId}
          poolId={position.poolId}
          collateral={position.collateralType}
          refetch={refetch}
          isOpen={isOpenFund}
          debt={position.debt.toNumber()}
          onClose={onCloseFund}
        />
      </Td>
      <Td>
        <Link
          as={RouterLink}
          to={`/accounts/${position.accountId}/positions/${position.collateralType.symbol}/${position.poolId}`}
          color="blue.400"
          display="inline-block"
          transform="translateY(-1.5px)"
        >
          <ExternalLinkIcon />
        </Link>
      </Td>
    </Tr>
  );
};
