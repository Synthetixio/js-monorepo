import React, { FC } from 'react';
import styled from 'styled-components';
import ChangePercent from 'components/ChangePercent';
import { CurrencyKey } from 'constants/currency';
import { formatCurrency, convertCurrency } from 'utils/formatters/number';
import { ContainerRow } from '../common';
import { WeiSource } from '@synthetixio/wei';

type CurrencyPriceProps = {
  currencyKey: CurrencyKey;
  price: WeiSource;
  sign?: string;
  change?: number;
  conversionRate?: WeiSource;
};

export const CurrencyPrice: FC<CurrencyPriceProps> = ({
  currencyKey,
  price,
  sign,
  change,
  conversionRate,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Price className="price">
        {formatCurrency(currencyKey, convertCurrency(price, conversionRate), { sign })}
      </Price>
      {change != null && <ChangePercent className="percent" value={change} />}
    </Container>
  );
};

const Container = styled(ContainerRow)`
  color: ${(props) => props.theme.colors.white};
`;

const Price = styled.span`
  font-family: ${(props) => props.theme.fonts.mono};
`;

export default CurrencyPrice;
