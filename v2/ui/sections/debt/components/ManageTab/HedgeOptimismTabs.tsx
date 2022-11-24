import { useParams } from 'react-router-dom';
import BuyHedgeTabOptimism from './BuyHedgeTabOptimism';
import SellHedgeTabOptimism from './SellHedgeTabOptimism';

export default function HedgeOptimismTabs() {
  const { action = 'buy' } = useParams();
  return action === 'buy' ? <BuyHedgeTabOptimism /> : <SellHedgeTabOptimism />;
}
