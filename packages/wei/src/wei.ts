// https://en.wikipedia.org/wiki/Scale_factor_(computer_science)

// TODO: create a BN extension which works as a replacement for big using scaled integers
import { BigNumber, ethers } from 'ethers';
import Big from 'big.js';

export const PRECISION = 18;
Big.DP = PRECISION;
/**
 * The scale factor. For now this is constant, but we might want to make it variable later on.
 * Note: this should always be a power of 2 as BN uses number arrays and does its calculations in
 * base 2, using another base will lead to translation losses to and from SBN.
 *
 * Wei is a scale factor of `10^18`, so use that for now.
 */
export const Z = BigNumber.from(10).pow(BigNumber.from(PRECISION));
/** Z^2 constant */
export const Z2 = Z.pow(2);
export const Zb = new Big(10).pow(PRECISION);

export type WeiSource = Wei | number | string | BigNumber | Big;

/**
 * A numeric value in Wei. This enables arithmetic to be performed on Wei types without needing
 * to convert them to a decimal value in-between.
 *
 * @warning ALL Arithmetic and Comparison operations assume non-Wei values if they are passed any
 * source material which is not an instance of `Wei`. If you have a Number/string/BN/Big which is
 * already in Wei and you would like to operate with it correctly, you must first construct a new
 * Wei value from it using `new Wei(numberinwei, true)` which is NOT the default behavior,
 * even for BN types.
 */
export default class Wei {
	static is(w: unknown): w is Wei {
		return w instanceof Wei;
	}

	static min(a: Wei, ...args: Wei[]): Wei {
		let best = a;
		for (const i of args) {
			best = best.lt(i) ? best : i;
		}
		return new Wei(best);
	}

	static max(a: Wei, ...args: Wei[]): Wei {
		let best = a;
		for (const i of args) {
			best = best.gt(i) ? best : i;
		}
		return new Wei(best);
	}

	static avg(a: Wei, ...args: Wei[]): Wei {
		let sum = new Wei(a);
		args.forEach((i) => (sum = sum.add(i)));
		return sum.div(1 + args.length);
	}

	/** Value */
	private readonly v: BigNumber;

	/**
	 * Create a (lazy as possible) clone of the source. For some types this means no memory copy will
	 * need to happen while for others it will. This should only be used for converting RHS parameters
	 * which are needed in a known form. Should probably only be used by the `Wei.from` function.
	 *
	 * @param n Source material
	 * @param isWei Whether the number passed in is already in Wei units. Ignored for BigNumber WeiSource
	 * (if true it is taken as the literal value, otherwise it will be scaled to be in Wei)
	 */
	constructor(n: WeiSource, isWei?: boolean);

	constructor(n: WeiSource, isWei = false) {
		if (n === undefined || n === null) throw new Error('Cannot prase undefined/null as a number.');
		if (Wei.is(n)) {
			this.v = n.v;
		} else if(n instanceof BigNumber) {
                        this.v = n;
		} else if (isWei) {
			// already wei, don't scale again
			if (n instanceof Big) {
				this.v = BigNumber.from(n.abs().toFixed(0));
			} else {
				this.v = BigNumber.from(n);
			}
		} else {
			// not wei, scale it
  			// TODO: avoid use of Big.js, but this is a really easy way to do the conversion for now
			this.v = BigNumber.from(new Big(n).mul(Zb).toFixed(0));
		}
	}

	///////////////////////////
	// Conversion functions //
	/////////////////////////

	/**
	 * Write the value as a string.
	 *
	 * @param asWei If true, then returns the scaled integer value, otherwise converts to a floating point value
	 * @param dp Decimal places to use when not printing as Wei
	 * @returns The value as a string
	 * @memberof Wei
	 */
	toString(dp = PRECISION, asWei = false): string {
		if (asWei) dp = 0;
		return this.toBig(asWei).toFixed(dp);
	}

	/** The unscaled value as a string. */
	get str(): string {
		return this.toString();
	}

	/**
	 * Write the value in Wei as a padded string which can be used for sorting.
	 * Will convert it to base64 to reduce the string length and make comparisons less costly.
	 *
	 * @returns Resulting string which can be used to sort multiple wei numbers.
	 * @memberof Wei
	 */
	toSortable(): string {
		// TODO: handle sign?
		return ethers.utils.hexZeroPad(Buffer.from(this.v.toHexString()), 64);
	}

	/**
	 * Convert the value of this to a BN type. This will always return the value as a scaled Wei
	 * integer. If you wish to convert it, simply take the result and divide by `Z`
	 *
	 * @returns The value (in Wei) as a BigNumber
	 * @memberof Wei
	 */
	toBN(): BigNumber {
		return BigNumber.from(this.v);
	}

	/** The scaled value as a BN */
	get bn(): BigNumber {
		return this.toBN();
	}

	/**
	 * Convert the value of this to a Big type.
	 *
	 * @param asWei If true, then returns the scaled integer value, otherwise converts to a floating point value.
	 * @returns The value as a Big type (either in Wei or not)
	 * @memberof Wei
	 */
	toBig(asWei = false): Big {
		const big = new Big(this.v.toString());
		return asWei ? big : big.div(Zb);
	}

	/** The unscaled value as a Big */
	get big(): Big {
		return this.toBig();
	}

	/**
	 * Convert the value to a JS number type.
	 *
	 * @param {boolean} [asWei=false] By default will convert to a floating point which should preserve accuracy of the most significant digits. Otherwise try to represent as an integer Wei value.
	 * @returns {number} The value as a number type (or as close as it can represent).
	 * @memberof Wei
	 */
	toNumber(asWei = false): number {
		// JS number has 52 bit mantissa, `ceil(log10(2^52)) = 16`
		const str = this.toBig(asWei).toPrecision(16);
		return Number.parseFloat(str);
	}

	/** The unscaled value as a number */
	get num(): number {
		return this.toNumber();
	}

	////////////////////
	// Math operators //
	////////////////////

	neg(): Wei {
		return new Wei(this.v.mul(-1), true);
	}

	abs(): Wei {
		return new Wei(this.v.abs(), true);
	}

	div(other: WeiSource): Wei {
		other = parseNum(other);
		return new Wei(this.v.mul(Z).div(other.v), true);
	}

	sub(other: WeiSource): Wei {
		other = parseNum(other);
		return new Wei(this.v.sub(other.v), true);
	}

	add(other: WeiSource): Wei {
		other = parseNum(other);
		return new Wei(this.v.add(other.v), true);
	}

	mul(other: WeiSource): Wei {
		other = parseNum(other);
		return new Wei(this.v.mul(other.v).div(Z), true);
	}

	pow(p: number): Wei {
		return new Wei(this.big.pow(p));
	}

	inv(): Wei {
		return new Wei(Z2.div(this.v), true);
	}

	///////////////////////////
	// Comparison operators //
	/////////////////////////

	cmp(other: WeiSource): number {
		other = parseNum(other);
		if (this.v.gt(other.v)) return 1;
		else if (this.v.lt(other.v)) return -1;
		else return 0;
	}

	eq(other: WeiSource): boolean {
		other = parseNum(other);
		return this.v.eq(other.v);
	}

	/**
	 * Fuzzy equality comparison. If passing a number, assumes it is not in Wei, so 1e-18 == 1 wei.
	 *
	 * @param other Value to compare against
	 * @param fuzz Tolerance for equality
	 * @returns True if other is within `fuzz` tolerance of this value.
	 * @memberof Wei
	 */
	feq(other: WeiSource, fuzz: WeiSource): boolean {
		const o = parseNum(other);
		const f = parseNum(fuzz);
		return this.v.sub(o.v).abs().lt(f.v);
	}

	gt(other: WeiSource): boolean {
		return this.cmp(other) > 0;
	}

	gte(other: WeiSource): boolean {
		return this.cmp(other) >= 0;
	}

	lt(other: WeiSource): boolean {
		return this.cmp(other) < 0;
	}

	lte(other: WeiSource): boolean {
		return this.cmp(other) <= 0;
	}
}

/** convenience function for not writing `new Wei(s)` every time. */
export function wei(s: WeiSource, isWei = false): Wei {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return new Wei(s as any, isWei);
}

function parseNum(v: WeiSource | Wei): Wei {
	return Wei.is(v) ? v : new Wei(v);
}
