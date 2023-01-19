import { EthereumIcon } from '../EthereumIcon';
import { SNXIcon } from '../SNXIcon';
import { IconProps } from '@chakra-ui/react';

interface CollateralIconProps extends IconProps {
  symbol: string;
  fill?: string;
  color?: string;
}
export const CollateralIcon = ({ symbol, ...props }: CollateralIconProps) => {
  switch (symbol) {
    case 'WETH':
      return <EthereumIcon {...props} />;
    case 'SNX':
      return <SNXIcon {...props} />;
    default:
      return <SNXIcon {...props} />;
  }
};
