/**
 * This is useful if you have a Record<string,number | undefined>
 * and want to get the values.
 * Calling Object.values() would return (number| undefined)[].
 * Whereas calling this function would return number[]
 */
export function values<O extends Record<string, unknown>>(o: O) {
  return Object.values(o) as Exclude<O[keyof O], undefined>[];
}
