import { useQuery } from '@tanstack/react-query';
import { PERPS_V2_DASHBOARD_GRAPH_URL } from '../utils/constants';

const gql = (data: TemplateStringsArray) => data[0];
const query = gql`
  query snx {
    synthetix(id: "synthetix") {
      feesByLiquidations
      feesByPositionModifications
      totalVolume
      totalLiquidations
      totalTraders
    }
  }
`;
export function useGetSynthetix() {
  return useQuery(['synthetix'], async () => {
    const response = await fetch(PERPS_V2_DASHBOARD_GRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const {
      data,
    }: {
      data: {
        synthetix: {
          feesByLiquidations: string;
          feesByPositionModifications: string;
          totalVolume: string;
          totalLiquidations: string;
          totalTraders: string;
        };
      };
    } = await response.json();
    return data;
  });
}
