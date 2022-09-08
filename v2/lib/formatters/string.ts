export const truncateAddress = (address: string, first = 5, last = 5) =>
  `${address.slice(0, first)}...${address.slice(-last, address.length)}`;
