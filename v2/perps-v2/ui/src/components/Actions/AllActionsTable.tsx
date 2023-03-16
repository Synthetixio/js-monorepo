import { TableContainer, Table, Thead, Tr, Tbody, Flex, Text } from '@chakra-ui/react';
import { Currency, TableHeaderCell, Market, Size, WalletAddress, MarginTransfer } from '../Shared';
import { AllActionsLoading } from './AllActionsLoading';
import { ActionData, useActions } from '../../hooks';
import { Action } from '../Shared/Action';

type ActionDataWithPos = ActionData & { currentPosSize: number; newPosSize: number };

const getPositionLabel = (pos: ActionDataWithPos) => {
  if (pos.label === 'Liquidation') {
    return pos.currentPosSize > 0 ? 'Long Liquidated' : 'Short Liquidated';
  }
  const size = parseFloat(pos.size);
  if (pos.currentPosSize === 0) {
    return size > 0 ? 'Long opened' : 'Short opened';
  }
  const haveShortOpened = pos.currentPosSize < 0;
  if (haveShortOpened) {
    if (size < 0) {
      return 'Short Increased';
    }
    if (pos.currentPosSize + size > 0) {
      return 'Short Flipped to Long';
    }
    if (pos.currentPosSize + size === 0) {
      return 'Short Closed';
    }
    return 'Short Decreased';
  }
  const haveLongOpen = pos.currentPosSize > 0;
  if (haveLongOpen) {
    if (size > 0) {
      return 'Long Increased';
    }
    if (pos.currentPosSize + size < 0) {
      return 'Long Flipped to Short';
    }
    if (pos.currentPosSize + size === 0) {
      return 'Long Closed';
    }

    return 'Long Decreased';
  }
  throw Error('Missed to handle something');
};

const isPosition = (l: string) => l !== 'Deposit Margin' && l !== 'Withdraw Margin';

export const AllActionsTable = () => {
  const { loading, data, error } = useActions();

  const dataWithPosition = data.actionData
    ?.slice()
    .reverse()
    .reduce((acc: ActionDataWithPos[], item) => {
      const { asset, size } = item;

      const prevSize =
        acc
          .slice()
          .reverse()
          .find((x) => x.asset === asset && x.currentPosSize !== undefined)?.newPosSize || 0;
      const newPosSize =
        item.label === 'Liquidation'
          ? 0
          : prevSize + (isPosition(item.label) ? parseFloat(size) : 0);
      const itemWithCurrentPosSize = {
        ...item,
        currentPosSize: prevSize,
        newPosSize,
      };
      return acc.concat(itemWithCurrentPosSize);
    }, [])
    .reverse();

  return (
    <>
      <TableContainer
        maxW="100%"
        my={5}
        borderColor="gray.900"
        borderWidth="1px"
        borderRadius="5px"
        sx={{
          borderCollapse: 'separate !important',
          borderSpacing: 0,
        }}
      >
        <Table bg="navy.700">
          <Thead>
            <Tr>
              <TableHeaderCell>Action</TableHeaderCell>
              <TableHeaderCell>Wallet Address</TableHeaderCell>
              <TableHeaderCell>Market</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Fee</TableHeaderCell>
            </Tr>
          </Thead>
          <Tbody>
            {loading && (
              <>
                <AllActionsLoading />
                <AllActionsLoading />
                <AllActionsLoading />
                <AllActionsLoading />
                <AllActionsLoading />
                <AllActionsLoading />
              </>
            )}
            {data?.actionData &&
              dataWithPosition.map((item, index) => {
                const { label, address, asset, price, fees, size, txHash, timestamp, leverage } =
                  item;
                const isLong = !size.includes('-');
                const displayLabel = isPosition(label) ? getPositionLabel(item) : label;

                return (
                  <Tr key={address.concat(index.toString())} borderTopWidth="1px">
                    <Action label={displayLabel} txHash={txHash} timestamp={timestamp} />
                    <WalletAddress account={address} />
                    <Market
                      asset={asset}
                      leverage={leverage}
                      long={isLong}
                      isPosition={isPosition(label)}
                    />
                    <Currency amount={price} />
                    {isPosition(label) ? (
                      <Size size={size} lastPrice={price} />
                    ) : (
                      <MarginTransfer size={size} />
                    )}

                    <Currency amount={fees} />
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        {!loading && data?.actionData.length === 0 && (
          <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
            <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
              No positions
            </Text>
          </Flex>
        )}
        {error && (
          <Flex width="100%" justifyContent="center" bg="navy.700" borderTopWidth="1px">
            <Text fontFamily="inter" fontWeight="500" fontSize="14px" color="gray.500" m={6}>
              No positions
            </Text>
          </Flex>
        )}
      </TableContainer>
    </>
  );
};
