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
