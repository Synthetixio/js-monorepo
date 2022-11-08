export function concatIds(ids: string[]): string {
  return ids.reduce((prev, cur) => (prev ? prev.concat('-').concat(cur) : cur), '');
}
