import { DepositingStats } from './Callouts';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Box } from '@chakra-ui/react';
import Manage from './Manage';
import { Rewards } from './Rewards/Rewards';
import { Pool } from './Pool';
import { FC } from 'react';
import { CollateralType } from '../../../utils/types';
import { formatValue } from '../../../utils/helpers';
import { useLiquidityPosition } from '../../../hooks/useLiquidityPosition';

interface Props {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
}

export const Position: FC<Props> = ({ accountId, poolId, collateral }) => {
  const { isLoading, debt, cRatio, collateralAmount, refetch } = useLiquidityPosition(
    accountId,
    poolId,
    collateral
  );

  if (isLoading)
    return (
      <Box my="8" textAlign="center">
        <Spinner />
      </Box>
    );

  const { price: priceBN, decimals } = collateral;

  const price = formatValue(priceBN || 0, decimals!);
  const collateralValue = collateralAmount * price;

  return (
    <>
      <DepositingStats
        collateral={collateral}
        collateralValue={collateralValue}
        collateralAmount={collateralAmount}
        debt={debt}
        cRatio={cRatio}
      />

      <Tabs isFitted isLazy>
        <TabList>
          <Tab>Manage Position</Tab>
          <Tab>Pool Liquidity</Tab>
          <Tab>Claim Rewards</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Manage
              collateralValue={collateralValue}
              collateralAmount={collateralAmount}
              debt={debt}
              cRatio={cRatio}
              accountId={accountId}
              poolId={poolId}
              collateral={collateral}
              refetch={refetch}
            />
          </TabPanel>
          <TabPanel>
            <Pool
              collateralAmount={collateralAmount}
              accountId={accountId}
              poolId={poolId}
              collateral={collateral}
              debt={debt}
              refetch={refetch}
            />
          </TabPanel>
          <TabPanel>
            <Rewards accountId={accountId} poolId={poolId} collateral={collateral} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
    // <Box mb="2">
    //   <Table size="sm" variant="simple">
    //     <TableCaption color="white">
    //       {/* if only depositing with spartan council fund */}
    //       <InfoOutlineIcon display="inline-block" transform="translateY(-1px)" /> Your depositing
    //       position is currently managed by{' '}
    //       <NavLink to="/dao">
    //         <Link fontWeight="semibold" color="cyan.500">
    //           The Spartan Council
    //         </Link>
    //       </NavLink>{' '}
    //       and is subject to change.
    //     </TableCaption>
    //     <Thead>
    //       <Tr>
    //         <Th color="white" pb="2">
    //           Asset
    //         </Th>
    //         <Th color="white" pb="2">
    //           Fees APY
    //         </Th>
    //         <Th color="white" pb="2">
    //           Rewards APY
    //         </Th>
    //         <Th color="white" pb="2">
    //           Position
    //         </Th>
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       <Tr>
    //         <Td py="4">
    //           <Heading size="sm">Synthetic&nbsp;Bitcoin</Heading>
    //           <Text mt="1" fontSize="xs">
    //             <span style={{ opacity: 0.8 }}>sBTC</span>
    //             <NavLink to="/synths/example">
    //               <Link color="cyan.500" ml="1" display="inline-block" transform="translateY(-1px)">
    //                 <ExternalLinkIcon />
    //               </Link>
    //             </NavLink>
    //           </Text>
    //         </Td>
    //         <Td>
    //           25.4%
    //           <Text fontSize="xs" opacity="0.8">
    //             sUSD
    //           </Text>
    //         </Td>
    //         <Td>
    //           70.4%
    //           <Text fontSize="xs" opacity="0.8">
    //             SNX
    //           </Text>
    //         </Td>
    //         <Td fontSize="lg">100%</Td>
    //       </Tr>
    //     </Tbody>
    //   </Table>
    // </Box>
  );
};
