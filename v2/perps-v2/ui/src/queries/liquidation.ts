import { useQuery } from '@tanstack/react-query';
import { BigNumber, utils } from 'ethers';
import { PERPS_V2_DASHBOARD_GRAPH_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/numbers';
import { useGetMarkets } from './markets';
import { FuturePosition } from './positions';

interface LiquidationResponse {
  data: {
    positionLiquidateds: {
      id: string;
      liquidator: string;
      market: string;
      marketAddress: string;
      size: string;
      price: string;
      fee: string;
      block: string;
      timestamp: string;
      type: string;
      entity: string;
      futuresPosition: FuturePosition;
    }[];
  };
}

export interface PositionLiquidated {
  id: string;
  liquidator: string;
  market: string;
  marketAddress: string;
  size: BigNumber;
  price: string;
  fee: string;
  block: string;
  timestamp: string;
  type: string;
  entity: string;
  futuresPosition: FuturePosition;
}

const gql = (data: TemplateStringsArray) => data[0];
const query = gql`
  query PositionLiquidated {
    positionLiquidateds(first: 100, oderBy: "timestamp", orderDirection: "desc") {
      id
      account
      liquidator
      market
      size
      price
      fee
      block
      timestamp
      futuresPosition {
        id
        account
        isLiquidated
        market
        isOpen
        openTimestamp
        closeTimestamp
        margin
        initialMargin
        entryPrice
        lastPrice
        pnl
        exitPrice
        leverage
        size
        long
        trades
        totalVolume
        feesPaidToSynthetix
      }
    }
  }
`;

export function useGetLiquidations() {
  const { data: markets } = useGetMarkets();
  return useQuery(['liquidations', markets?.toString()], async () => {
    const response = await fetch(PERPS_V2_DASHBOARD_GRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const { data }: LiquidationResponse = await response.json();
    return data.positionLiquidateds.map((position) => ({
      ...position,
      size: utils.parseEther(position.size),
      market: markets?.find((d) => d.id.toLowerCase() === position.market.toLowerCase())?.marketKey,
      marketAddress: position.market.toLowerCase(),
      price: numberWithCommas((Number(position.price) / 1e18).toString(), 2),
      entity: 'Position Liquidated',
    })) as PositionLiquidated[];
  });
}
