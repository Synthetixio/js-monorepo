import { MarketSectionUi } from './MarketSection';
import { wei } from '@synthetixio/wei';
import { PoolType } from '@snx-v3/usePoolData';

function mockMarket(i: number) {
  return {
    id: `MARKET_${i}`,
    address: 'MARKET_ADDRESS',
    usd_deposited: wei('10000'),
    usd_withdrawn: wei('9000'),
    net_issuance: wei('1000'),
    reported_debt: wei('100'),
    pnl: wei('0.2'),
    market_snapshots_by_week: [
      {
        id: '2',
        usd_deposited: wei('10000'),
        usd_withdrawn: wei('9000'),
        net_issuance: wei('1000'),
        reported_debt: wei('100'),
        pnl: wei('0.2'),
        updated_at: 'updated at for 2',
        updates_in_period: 2,
      },
      {
        id: '1',
        usd_withdrawn: wei('1000'),
        usd_deposited: wei('1500'),
        net_issuance: wei('500'),
        reported_debt: wei('50'),
        pnl: wei('0.1'),
        updated_at: 'updated at for 1',
        updates_in_period: 2,
      },
    ],
  };
}

describe('Pool page / Market section', () => {
  it('should render without markets', () => {
    cy.viewport(800, 500);
    cy.mount(
      <MarketSectionUi
        poolId="POOL_ID"
        poolDataFetched={true}
        poolData={{
          id: 'POOL_ID',
          name: 'POOL_NAME',
          total_weight: null,
          configurations: [],
        }}
      />
    );
    cy.get('#app')
      .should('include.text', 'Markets')
      .and('include.text', 'POOL_NAME')
      .and('include.text', 'No markets configured for the pool');
  });

  it('should render with markets', () => {
    cy.viewport(800, 500);

    cy.mount(
      <MarketSectionUi
        poolId="POOL_ID"
        poolDataFetched={true}
        poolData={
          {
            id: 'POOL_ID',
            name: 'POOL_NAME',
            total_weight: wei('20'),
            configurations: [
              {
                id: 'MARKET_1',
                market: mockMarket(1),
                weight: wei('10'),
                max_debt_share_value: wei('50'),
              },
              {
                id: 'MARKET_2',
                market: mockMarket(2),
                weight: wei('10'),
                max_debt_share_value: wei('50'),
              },
            ],
          } as PoolType
        }
        marketNamesById={{
          MARKET_1: 'MARKET_NAME_1',
          MARKET_2: 'MARKET_NAME_2',
        }}
      />
    );
    cy.get('#app')
      .and('include.text', 'POOL_NAME')
      .and('include.text', 'LAST 7 DAYS')
      .and('include.text', 'Performance Lifetime')
      .and('include.text', 'MARKET_NAME_1')
      .and('include.text', 'ID: MARKET_1')
      .and('include.text', 'MARKET_NAME_2')
      .and('include.text', 'ID: MARKET_2');
  });
});
