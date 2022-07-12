import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Column } from 'react-table';

import { Table } from './Table';

export default {
  title: 'Table',
  component: Table,
  decorators: [(Story) => <Story />]
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Primary = Template.bind({});

type Crypto = {
  coin: string;
  symbol: string;
  price: number;
  percent1H: number;
  percent24H: number;
  percent7D: number;
  last7Days: string;
};

const data: Crypto[] = [
  {
    coin: 'Synthetix',
    symbol: 'sUSD',
    price: 11,
    percent1H: -1.3,
    percent24H: -3.5,
    percent7D: -8.6,
    last7Days: 'https://picsum.photos/50'
  },
  {
    coin: 'Synthetix',
    symbol: 'SNX',
    price: 2.71,
    percent1H: -5.3,
    percent24H: 9.5,
    percent7D: 2.6,
    last7Days: 'https://picsum.photos/50'
  }
];

const columns: Column<Crypto>[] = [
  {
    disableSortBy: true,
    Header: 'COIN',
    accessor: 'symbol',
    columnClass: 'ui-text-left ui-pl-14',
    Cell: ({ row }) => (
      <div className='ui-flex ui-items-center'>
        <img
          alt=''
          className='ui-w-6 ui-h-6 ui-rounded-full ui-mr-3'
          src='https://picsum.photos/50'
        />
        <span className='ui-tg-caption-bold lg:ui-tg-content-bold'>{row.original.symbol}</span>
        <span className='ui-hidden ui-tg-content ui-ml-3 lg:ui-block'>{row.original.coin}</span>
      </div>
    )
  },
  {
    Header: 'PRICE*',
    accessor: (row) => row.price,
    sortType: (a, b) => a.original.price - b.original.price
  },
  {
    Header: '1H',
    accessor: 'percent1H',
    Cell: (row) => row.value,
    sortType: (a, b) => a.original.percent1H - b.original.percent1H
  },
  {
    Header: '7H',
    accessor: 'percent7D',
    Cell: (row) => row.value,
    sortType: (a, b) => a.original.percent7D - b.original.percent7D
  }
];

Primary.args = {
  className: 'ui-shadow-md',
  data: data as unknown as Readonly<Record<string, unknown>[]>,
  columns: columns as unknown as Readonly<Column<Record<string, unknown>>[]>,
  initialState: { pageSize: 2 }
};
