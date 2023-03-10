// import { FC, useState } from 'react';
// import {
//   IconButton,
//   Table,
//   TableContainer,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr,
//   useToast,
// } from '@chakra-ui/react';
// // import useGetPositions from '../../queries/positions';
// import { useParams } from 'react-router-dom';
// import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon } from '@chakra-ui/icons';
// import { numberWithCommas } from '../../utils/numbers';
// import ReactPaginate from 'react-paginate';
// import './PositionTable.css';
// // import { sub } from 'date-fns';

// export type SortConfig = [
//   (
//     | 'account'
//     | 'asset'
//     | 'market'
//     | 'entryPrice'
//     | 'exitPrice'
//     | 'isLiquidated'
//     | 'isOpen'
//     | 'openTimestamp'
//     | 'closeTimestamp'
//     | 'long'
//     | 'size'
//     | 'margin'
//     | 'feesPaidToSynthetix'
//     | 'leverage'
//     | 'pnl'
//   ),
//   boolean
// ];

// export const PositionsTable: FC = () => {
//   const params = useParams();
//   const toast = useToast();

//   // TODO @MF GET RID OF THAT AND USE the pagination in the v2 components
//   const [itemOffset, setItemOffset] = useState(0);
//   const [sortConfig, setSortConfig] = useState<SortConfig>(['openTimestamp', false]);

//   // const { watch } = useForm({
//   //   defaultValues: {
//   //     asset: 'all',
//   //     liquidated: false,
//   //     deactivateLiquidated: true,
//   //     open: false,
//   //     deactivateOpen: true,
//   //     deactivateOpenedAt: false,
//   //     deactivateClosedAt: false,
//   //     openedAt: monthAgo(),
//   //     closedAt: new Date(),
//   //     walletAddress: '',
//   //   },
//   // });

//   // const { data: positions, isLoading } = useGetPositions({
//   //   address: params.walletAddress,
//   //   filterOptions: {
//   //     openedAt: Math.round(sub(new Date(), { months: 1 }).getTime() / 1000),
//   //     closedAt: Math.round(new Date().getTime() / 1000),
//   //     liquidated: false,
//   //   },
//   //   sortConfig,
//   // });

//   const endOffset = itemOffset + 50;
//   const currentItems = positions?.futuresPositions?.slice(itemOffset, endOffset) || [];
//   const pageCount = positions?.futuresPositions
//     ? Math.ceil(positions?.futuresPositions.length / 50)
//     : 1;

//   const handlePageClick = ({ selected }: { selected: number }) => {
//     if (positions?.futuresPositions) {
//       const newOffset = (selected * 100) % positions?.futuresPositions.length;
//       setItemOffset(newOffset);
//     }
//   };

//   console.log(isLoading);

//   return (
//     <>
//       <TableContainer w="100%">
//         <Table>
//           <Thead>
//             <Tr>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['account', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'account' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'account' ? 'cyan.500' : ''}
//               >
//                 Address
//                 {sortConfig[0] === 'account' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['asset', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'asset' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'asset' ? 'cyan.500' : ''}
//               >
//                 Asset
//                 {sortConfig[0] === 'asset' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['market', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'market' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'market' ? 'cyan.500' : ''}
//               >
//                 Market
//                 {sortConfig[0] === 'market' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['entryPrice', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'entryPrice' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'entryPrice' ? 'cyan.500' : ''}
//               >
//                 Entry Price
//                 {sortConfig[0] === 'entryPrice' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['exitPrice', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'exitPrice' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'exitPrice' ? 'cyan.500' : ''}
//               >
//                 Exit Price
//                 {sortConfig[0] === 'exitPrice' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['leverage', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'leverage' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'leverage' ? 'cyan.500' : ''}
//               >
//                 Leverage
//                 {sortConfig[0] === 'leverage' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['pnl', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'pnl' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'pnl' ? 'cyan.500' : ''}
//               >
//                 PNL
//                 {sortConfig[0] === 'pnl' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['margin', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'margin' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'margin' ? 'cyan.500' : ''}
//               >
//                 Margin
//                 {sortConfig[0] === 'margin' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['size', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'size' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'size' ? 'cyan.500' : ''}
//               >
//                 Size
//                 {sortConfig[0] === 'size' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['feesPaidToSynthetix', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'feesPaidToSynthetix' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'feesPaidToSynthetix' ? 'cyan.500' : ''}
//               >
//                 Fees for Synthetix
//                 {sortConfig[0] === 'feesPaidToSynthetix' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['long', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'long' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'long' ? 'cyan.500' : ''}
//               >
//                 Side
//                 {sortConfig[0] === 'long' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['isLiquidated', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'isLiquidated' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'isLiquidated' ? 'cyan.500' : ''}
//               >
//                 Liquidated
//                 {sortConfig[0] === 'isLiquidated' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['isOpen', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'isOpen' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'isOpen' ? 'cyan.500' : ''}
//               >
//                 Open
//                 {sortConfig[0] === 'isOpen' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['openTimestamp', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'openTimestamp' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'openTimestamp' ? 'cyan.500' : ''}
//               >
//                 Opened at
//                 {sortConfig[0] === 'openTimestamp' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//               <Th
//                 cursor="pointer"
//                 onClick={() => {
//                   setSortConfig((state) => ['closeTimestamp', !state[1]]);
//                 }}
//                 border={sortConfig[0] === 'closeTimestamp' ? '1px solid' : ''}
//                 borderColor={sortConfig[0] === 'closeTimestamp' ? 'cyan.500' : ''}
//               >
//                 Closed at
//                 {sortConfig[0] === 'closeTimestamp' &&
//                   (sortConfig[1] ? <ChevronDownIcon /> : <ChevronUpIcon />)}
//               </Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {!!currentItems &&
//               currentItems.map((position, index) => {
//                 return (
//                   <Tr key={position.account.concat(index.toString())}>
//                     <Td
//                       cursor="pointer"
//                       onClick={() => {
//                         toast({
//                           title: 'Copy to clipboard',
//                           status: 'success',
//                           isClosable: true,
//                           duration: 5000,
//                         });
//                         navigator.clipboard.writeText(position.account);
//                       }}
//                     >
//                       {position.account
//                         .substring(0, 5)
//                         .concat('...')
//                         .concat(position.account.substring(position.account.length - 5))}
//                       <IconButton
//                         marginLeft="2"
//                         variant="ghost"
//                         aria-label="link to optimisim etherscan"
//                         icon={<ExternalLinkIcon />}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           window.open(
//                             'https://optimistic.etherscan.io/address/' + position.account
//                           );
//                         }}
//                       />
//                     </Td>
//                     <Td>{position.asset}</Td>
//                     <Td>{position.market}</Td>
//                     <Td>${numberWithCommas((Number(position.entryPrice) / 1e18).toFixed(2))}</Td>
//                     <Td>
//                       {position.isOpen
//                         ? '-'
//                         : `$${numberWithCommas((Number(position.exitPrice) / 1e18).toFixed(2))}`}
//                     </Td>
//                     <Td>
//                       {Math.abs(Number(position.leverage) / 1e18)
//                         .toFixed(2)
//                         .concat('x')}
//                     </Td>
//                     <Td>
//                       {numberWithCommas((Number(position.pnl) / 1e18).toFixed(2)).concat('%')}
//                     </Td>
//                     <Td>${numberWithCommas((Number(position.margin) / 1e18).toFixed(2))}</Td>
//                     <Td>${numberWithCommas((Number(position.size) / 1e18).toFixed(2))}</Td>
//                     <Td>
//                       ${numberWithCommas((Number(position.feesPaidToSynthetix) / 1e18).toFixed(2))}
//                     </Td>
//                     <Td>{position.long ? 'Long' : 'Short'}</Td>
//                     <Td>{position.isLiquidated ? `💀` : `NO`}</Td>
//                     <Td>{position.isOpen ? `✅` : `❌`}</Td>
//                     <Td>{position?.openTimestamp}</Td>
//                     <Td>{position?.closeTimestamp}</Td>
//                   </Tr>
//                 );
//               })}
//           </Tbody>
//         </Table>
//       </TableContainer>
//       <ReactPaginate
//         className="paginator"
//         pageClassName="pageItems"
//         nextClassName="nextButton"
//         previousClassName="previousButton"
//         breakClassName="breakSpacer"
//         activeClassName="activePage"
//         breakLabel="..."
//         nextLabel="Next =>"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="<= Previous"
//       />
//     </>
//   );
// };
export {};
