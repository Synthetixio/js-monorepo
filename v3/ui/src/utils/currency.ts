/**
 * show currency symbol: { style: "currency", currency: "USD" } |
 * disable thousand separation: { useGrouping: false }
 * @param  {number|string} value
 * @param  {Intl.NumberFormatOptions} options?
 */
export const currency = (
  value: number | string,
  options?: Intl.NumberFormatOptions,
  minimumDigitsToShowAfterZeros = 2
) => {
  try {
    const stringValue = value.toString();
    const floatNumber = parseFloat(stringValue);

    const decimals =
      floatNumber < 0
        ? -floatNumber - Math.floor(-floatNumber)
        : floatNumber - Math.floor(floatNumber);
    const zeroDecimals = decimals !== 0 ? -Math.floor(Math.log10(decimals) + 1) : 0;

    const maximumFractionDigits = zeroDecimals + minimumDigitsToShowAfterZeros;

    return isNaN(floatNumber)
      ? stringValue
      : floatNumber.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits,
          ...options,
        });
  } catch (error) {
    return value + '';
  }
};
