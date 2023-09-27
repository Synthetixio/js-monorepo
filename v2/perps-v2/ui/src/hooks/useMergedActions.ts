import { usePolynomialAccount } from './usePolynomialAccount';
import { useKwentaAccount } from './useKwentaAccount';
import { useActions } from './useActions';
import Wei from '@synthetixio/wei';

interface MergedAction {
  address: string;
  asset: string;
  fees: Wei | null;
  id: string;
  label: string;
  leverage: Wei | null;
  price: Wei | null;
  size: Wei;
  timestamp: Wei;
  txHash: string;
  protocol?: string;
}

export const useMergedActions = (account?: string) => {
  const { data: kwentaAccount } = useKwentaAccount(account);
  const { data: polynomialAccount } = usePolynomialAccount(account);

  const { data, loading, error } = useActions(account);
  const {
    data: dataKwenta,
    loading: loadingKwenta,
    error: errorKwenta,
  } = useActions(kwentaAccount?.account || '');
  const {
    data: dataPolynomial,
    loading: loadingPolynomial,
    error: errorPolynomial,
  } = useActions(polynomialAccount?.account || '');

  const isDataLoading = loading || loadingKwenta || loadingPolynomial;

  let mergedArray: MergedAction[] = [];

  if (!isDataLoading) {
    mergedArray = [...(Array.isArray(data) ? data : [])];

    if (Array.isArray(dataKwenta)) {
      const dataKwentaWithProp = dataKwenta.map((obj) => ({ ...obj, protocol: 'kwenta' }));
      mergedArray = [...mergedArray, ...dataKwentaWithProp];
    }

    if (Array.isArray(dataPolynomial)) {
      const dataPolynomialWithProp = dataPolynomial.map((obj) => ({
        ...obj,
        protocol: 'polynomial',
      }));
      mergedArray = [...mergedArray, ...dataPolynomialWithProp];
    }
  }

  const errors = [error, errorKwenta, errorPolynomial].filter((e) => e !== undefined);
  const parsedData = mergedArray.sort((a, b) => b.timestamp.toNumber() - a.timestamp.toNumber());

  return {
    loading: isDataLoading,
    data: parsedData,
    error: errors.length > 0 ? errors : null,
  };
};
