export function stringToDecimal(value: string, fromDP = 18): number {
  return Number(value) / Math.pow(10, fromDP);
}

export const truncateAddress = (address: string, first = 5, last = 5) =>
  `${address.slice(0, first)}...${address.slice(-last, address.length)}`;
