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

  const { collateralAmount: collateralAmountBN, collateralType, cRatio, debt, poolId } = position;

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
            {currency(collateralAmount)} SNX
          </Text>
        </>
      </Td>
      <Td py="4">
        ${currency(debt.toString())}
        <Text fontSize="xs" opacity="0.66" mt="1'">
          $0 net snxUSD minted {/* or burned */}
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
        {poolsData[position.poolId.toString()]?.name}{' '}
        <Text fontSize="xs" opacity="0.66" mt="1'">
          ID: {poolId}
        </Text>
      </Td>
      <Td>
        <Link
          as={RouterLink}
          to={`/accounts/${position.accountId}/positions/${position.collateralType.symbol}/${position.poolId}`}
          color="cyan.500"
          display="inline-block"
          transform="translateY(-1.5px)"
        >
          <ExternalLinkIcon />
        </Link>
      </Td>
    </Tr>
  );
};
