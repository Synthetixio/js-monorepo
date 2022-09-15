import { createContext } from 'react';
import { Signer } from 'ethers';

export const SignerContext = createContext<Signer | null>(null);
