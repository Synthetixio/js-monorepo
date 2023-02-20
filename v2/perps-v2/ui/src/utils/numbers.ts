export function numberWithCommas(value: string, decimals?: number) {
  const parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const joinedParts = parts.join('.');
  return decimals ? joinedParts.substring(0, joinedParts.indexOf('.') + decimals + 1) : joinedParts;
}
