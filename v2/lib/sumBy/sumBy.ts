export const sumBy = <K extends PropertyKey, T extends Record<K, number>>(key: K, arr: T[]) =>
  arr.reduce((acc, val) => {
    const keyValue = val[key];
    return acc + keyValue;
  }, 0);
