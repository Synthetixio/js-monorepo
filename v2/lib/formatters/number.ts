export function numberWithCommas(value: string) {
  const parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

interface Options extends Intl.NumberFormatOptions {
  locales?: string | string[];
}
export const formatNumberToUsd = (val: number | string, options?: Options) => {
  const optionsWithDefault = { style: 'currency', currency: 'USD', locales: 'en-EN', ...options };
  return new Intl.NumberFormat(optionsWithDefault.locales, optionsWithDefault).format(Number(val));
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
