import Wei, { wei } from '@synthetixio/wei';

export function scale(input: Wei, decimalPlaces: number): Wei {
  return input.mul(wei(10).pow(decimalPlaces));
}

export function expo(x: string, f: number) {
  return Number.parseFloat(x).toExponential(f);
}
