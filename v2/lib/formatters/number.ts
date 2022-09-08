export function numberWithCommas(value: string) {
  const parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export const formatNumberToUsd = (val: number, options?: Intl.NumberFormatOptions) => {
  const optionsToUse = { style: 'currency', currency: 'USD', ...options };
  return new Intl.NumberFormat('en-EN', optionsToUse).format(Number(val));
};

export const formatNumber = (value: number | string, options?: Intl.NumberFormatOptions) => {
  const optionsWithDefault = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  };
  return new Intl.NumberFormat('en-EN', optionsWithDefault).format(Number(value));
};
