import { Wei } from '@synthetixio/wei';

export function currency(
  value: Wei,
  options?: Intl.NumberFormatOptions,
  minimumDigitsToShowAfterZeros = 2
) {
  try {
    const stringValue = value.toString();
    const numberValue = value.toNumber();

    const decimals =
      numberValue < 0
        ? -numberValue - Math.floor(-numberValue)
        : numberValue - Math.floor(numberValue);
    const zeroDecimals = decimals !== 0 ? -Math.floor(Math.log10(decimals) + 1) : 0;

    const maximumFractionDigits = zeroDecimals + minimumDigitsToShowAfterZeros;

    return isNaN(numberValue)
      ? stringValue
      : numberValue.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits,
          ...options,
        });
  } catch (error) {
    return value + '';
  }
}
