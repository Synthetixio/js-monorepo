import { BigNumber } from 'ethers';
import { z } from 'zod';

export const ZodBigNumber = z.custom<BigNumber>((val) => BigNumber.isBigNumber(val));
