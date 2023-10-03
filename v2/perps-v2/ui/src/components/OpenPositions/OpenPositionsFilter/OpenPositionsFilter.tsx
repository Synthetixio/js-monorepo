import { Stack } from '@chakra-ui/react';
import { MarketSelect, DropdownFilter } from '../../Shared';
import { PageFilter } from './PageFilter';
import { useMarketSummaries } from '../../../hooks/useMarketSummaries';

interface DropdownInterface {
  value: string;
  display: string;
}

const ORDER_BY_CATEGORIES: DropdownInterface[] = [
  { value: 'size', display: 'Size' },
  { value: 'unrealizedPnl', display: 'Unrealized PNL' },
  { value: 'realizedPnl', display: 'Realized PNL' },
];

const ORDER_DIRECTIONS: DropdownInterface[] = [
  { value: 'desc', display: 'Desc' },
  { value: 'asc', display: 'Asc' },
];

interface OpenPositionsFilterProps {
  route: string;
}

export const OpenPositionsFilter = ({ route }: OpenPositionsFilterProps) => {
  const markets = useMarketSummaries();
  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 5, md: 10 }} width="100%">
      <MarketSelect markets={markets.data?.map((x) => x.asset)} route="positions" />

      <DropdownFilter
        route={route}
        options={ORDER_BY_CATEGORIES}
        queryParam="orderby"
        label="Order By"
      />

      <DropdownFilter
        route={route}
        options={ORDER_DIRECTIONS}
        queryParam="direction"
        label="Sort Order"
      />

      <PageFilter route={route} />
    </Stack>
  );
};
