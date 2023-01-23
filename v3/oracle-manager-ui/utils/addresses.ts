export function shortAddress(address?: string) {
  if (!address) return 'not found';
  return address
    .substring(0, 4)
    .concat('...')
    .concat(address.substring(address.length - 4));
}
