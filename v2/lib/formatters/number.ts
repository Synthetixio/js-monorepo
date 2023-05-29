export function numberWithCommas(value: string, decimals?: number) {
  const parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const joinedParts = parts.join('.');
  return decimals ? joinedParts.substring(0, joinedParts.indexOf('.') + decimals + 1) : joinedParts;
}

interface Options extends Intl.NumberFormatOptions {
  locales?: string | string[];
}
export const formatNumberToUsd = (val: number | string, options?: Options) => {
  const optionsWithDefault = { style: 'currency', currency: 'USD', locales: 'en-EN', ...options };
  return new Intl.NumberFormat(optionsWithDefault.locales, optionsWithDefault).format(Number(val));
};

export const formatNumberToCurrencyBasedOnSize = (val: number | string) => {
  const num = Number(val);
  if (num < 0.0001) {
    return formatNumberToUsd(num, { maximumFractionDigits: 8 });
  }
  if (num < 1) {
    return formatNumberToUsd(num, { maximumFractionDigits: 4 });
  }
  return formatNumberToUsd(num, { maximumFractionDigits: 2 });
};

export const formatNumber = (value: number | string, options?: Options) => {
  const optionsWithDefault = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    locales: 'en-EN',
    ...options,
  };
  return new Intl.NumberFormat(optionsWithDefault.locales, optionsWithDefault).format(
    Number(value)
  );
};

export const formatPercent = (value: number | string, options?: Options) => {
  const optionsWithDefault = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    locales: 'en-EN',
    style: 'percent',
    ...options,
  };
  return new Intl.NumberFormat(optionsWithDefault.locales, optionsWithDefault).format(
    Number(value)
  );
};
