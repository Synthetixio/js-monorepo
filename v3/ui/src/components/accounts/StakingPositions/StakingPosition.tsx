import { StakingPositionType } from './types';
import { EditIcon, InfoIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
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
import { BigNumber, utils } from 'ethers';
import { Link as RouterLink } from 'react-router-dom';

export default function StakingPosition({ position }: { position: StakingPositionType }) {
  // If the connected wallet doesn’t own this account token, remove/disable the interactivity

  const { isOpen: isOpenFund, onOpen: onOpenFund, onClose: onCloseFund } = useDisclosure();
  const { isOpen: isOpenDebt, onOpen: onOpenDebt, onClose: onCloseDebt } = useDisclosure();

  const { collateralAmount: collateralAmountBN, collateralType } = position;

  const formatValue = (value: BigNumber, decimals: number) =>
    parseInt(utils.formatUnits(value, decimals));

  const { decimals, price: priceBN, priceDecimals } = collateralType;

  const collateralAmount = formatValue(collateralAmountBN, decimals);
  const price = formatValue(priceBN!, priceDecimals!);
  const collateralValue = collateralAmount * price;

  const debt = 0;

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
        ${debt}
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
                              colorScheme="blue"
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
                              colorScheme="blue"
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
                              colorScheme="blue"
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
                              colorScheme="blue"
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
        {debt <= 0 ? (
          <Text fontWeight="bold" color="green">
            No debt <InfoIcon transform="translateY(-1px)" />
          </Text>
        ) : (
          <>0%</>
        )}
        {/* collateralValue / debt * 100 */}
        {/* <Text fontWeight="bold" color="red">
          232% <WarningIcon transform="translateY(-1px)" />
        </Text> */}

        <Text fontSize="xs" opacity="0.66" mt="1'">
          {/*target here as well?*/}
          {formatValue(
            collateralType!.minimumCRatio!.mul(BigNumber.from(100)),
            collateralType.decimals
          ).toFixed(0)}
          % Min.
        </Text>
      </Td>

      <Td>
        <Link
          as={RouterLink}
          to={'/funds/example'}
          _hover={{ textDecoration: 'none' }}
          display="inline"
          borderBottom="1px dotted rgba(255,255,255,0.5)"
        >
          Spartan Council
        </Link>
        <Link color="blue.400" ml="1">
          <EditIcon onClick={onOpenFund} style={{ transform: 'translateY(-2px)' }} />
        </Link>
        {/*
        For 0 fund:
        <Text opacity="0.66">None
          <Link color="blue.400" ml="1">
            <EditIcon onClick={onOpenFund} style={{ transform: 'translateY(-2px)' }} />
          </Link>
              */}
        {/*<Text fontSize="xs" opacity="0.66" mt="1'">&times;1 Leverage</Text>*/}

        <Modal size="2xl" isOpen={isOpenFund} onClose={onCloseFund}>
          <ModalOverlay />
          <ModalContent bg="black" color="white">
            <ModalHeader>Select Fund</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <EditPosition /> */}
              {/*
              <Heading size="sm" mb="3">Leverage</Heading>
              <Grid templateColumns='repeat(12, 1fr)' gap={6} alignItems="center" mb="6">
                <GridItem colSpan="3">
                  <InputGroup>
                    <InputLeftAddon bg="black">&times;</InputLeftAddon>
                    <Input id='amount' type='amount' borderLeft="none" value="1" />
                  </InputGroup>
                </GridItem>
                <GridItem colSpan="9">
                  <Text fontSize="sm">Leveraging your staking position allows you to earn more rewards, but your c-ratio is subject to greater volatiity. <em>Use leverage with caution.</em></Text>
                </GridItem>
              </Grid>
            */}
              <Button w="100%" colorScheme="blue">
                Update
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Td>
      <Td isNumeric>
        <Button size="xs" colorScheme="red">
          Unstake
        </Button>
      </Td>
    </Tr>
  );
}
