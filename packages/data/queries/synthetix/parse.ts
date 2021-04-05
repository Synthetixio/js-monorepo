import { Synthetix } from '../../generated/graphql';

export const parseSynthetix = ({ 
    id,
    issuers,
    snxHolders,
}: Synthetix): Synthetix => ({ 
    id,
    issuers: Number(issuers),
    snxHolders: Number(snxHolders),
});
