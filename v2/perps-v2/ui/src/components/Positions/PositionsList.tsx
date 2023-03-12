import { useQuery } from '@apollo/client';
import { TableContainer, Table, Thead, Tr, Tbody, Td } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
// import ReactPaginate from 'react-paginate';
import { POSITIONS_QUERY } from '../../queries/positions';
import { numberWithCommas } from '../../utils/numbers';
import { Currency, TableHeaderCell, PnL, Market } from '../Shared';
import { utils } from 'ethers';
import { FuturesPosition_OrderBy, OrderDirection } from '../../__generated__/graphql';

export const PositionsList = () => {
  const { walletAddress } = useParams();

  const { loading, data } = useQuery(POSITIONS_QUERY, {
    pollInterval: 5000,
    variables: {
      where: { size_gt: '0', isOpen: true },
      orderBy: FuturesPosition_OrderBy.OpenTimestamp,
      orderDirection: OrderDirection.Desc,
      first: 10,
    },
  });

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
              <TableHeaderCell>Market</TableHeaderCell>
              <TableHeaderCell>Net Value</TableHeaderCell>
              <TableHeaderCell>PnL</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Collateral</TableHeaderCell>
              <TableHeaderCell>Funding</TableHeaderCell>
              <TableHeaderCell>Entry Price</TableHeaderCell>
              <TableHeaderCell>Mark Price</TableHeaderCell>
              <TableHeaderCell>Liquidation Price</TableHeaderCell>
            </Tr>
          </Thead>
          <Tbody>
            {data?.futuresPositions.map(
              (
                {
                  account,
                  market: { asset },
                  entryPrice,
                  exitPrice,
                  isOpen,
                  leverage,
                  pnl,
                  margin,
                  size,
                  openTimestamp,
                  closeTimestamp,
                  long,
                  feesPaidToSynthetix,
                  isLiquidated,
                },
                index
              ) => {
                console.log(size, utils.parseBytes32String(asset));
                return (
                  <Tr key={account.concat(index.toString())} borderTopWidth="1px">
                    <Market asset={asset} leverage={leverage} long={long} />
                    <Td cursor="pointer" border="none">
                      {account
                        .substring(0, 5)
                        .concat('...')
                        .concat(account.substring(account.length - 5))}
                    </Td>
                    <PnL amount={pnl} />
                    <Currency amount={entryPrice} />
                    <Td border="none">
                      {isOpen ? '-' : `$${numberWithCommas((Number(exitPrice) / 1e18).toFixed(2))}`}
                    </Td>
                    <Td border="none">
                      {Math.abs(Number(leverage) / 1e18)
                        .toFixed(2)
                        .concat('x')}
                    </Td>
                    <Td border="none">
                      {numberWithCommas((Number(pnl) / 1e18).toFixed(2)).concat('%')}
                    </Td>
                    <Currency amount={margin} />
                    {/* <Td>${numberWithCommas((Number(size) / 1e18).toFixed(2))}</Td> */}
                    {/* <Td>${numberWithCommas((Number(feesPaidToSynthetix) / 1e18).toFixed(2))}</Td> */}
                    {/* <Td>{long ? 'Long' : 'Short'}</Td>
                    <Td>{isLiquidated ? `💀` : `NO`}</Td>
                    <Td>{isOpen ? `✅` : `❌`}</Td>
                    <Td>{openTimestamp}</Td>
                    <Td>{closeTimestamp}</Td> */}
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <ReactPaginate
        className="paginator"
        pageClassName="pageItems"
        nextClassName="nextButton"
        previousClassName="previousButton"
        breakClassName="breakSpacer"
        activeClassName="activePage"
        breakLabel="..."
        nextLabel="Next =>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<= Previous"
      /> */}
    </>
  );
};
