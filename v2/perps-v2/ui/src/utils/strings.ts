export function stringToDecimal(value: string, fromDP = 18): number {
  return Number(value) / Math.pow(10, fromDP);
}
