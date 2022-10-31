import { CollateralType } from '../../../utils/types';
/*
import { Heading, Link, UnorderedList, ListItem } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { formatValue } from '../../../utils/helpers';
*/

export default function HowItWorks({}: /*selectedCollateralType*/ {
  selectedCollateralType: CollateralType;
}) {
  return (
    <>
      {/*
      <Heading
        size="xs"
        mb="3"
        color="gray.300"
        fontWeight="300"
        textTransform="uppercase"
        letterSpacing="1.5px"
      >
        How it works
      </Heading>
      <UnorderedList>
        <ListItem mb="2">
          By default, your staking position will be managed by the <Link>Spartan Council</Link>, a
          DAO elected by stakers of SNX.{' '}
          <Link
            fontWeight="semibold"
            color="cyan.500"
            isExternal
            href="https://governance.synthetix.io"
          >
            Go vote
          </Link>
        </ListItem>
        {selectedCollateralType && (
          <ListItem mb="2">
            <>
              Currently, your projected rewards are{' '}
              <strong>X% APY in snxUSD plus Y% APY in SNX</strong> and you’ll need to maintain a
              C-Ratio of at least{' '}
              {formatValue(
                BigNumber.from(selectedCollateralType!.minimumCRatio! || 0).mul(
                  BigNumber.from(100)
                ),
                6
              ).toFixed(0)}
              %.
            </>
          </ListItem>
        )}
        <ListItem mb="2">Once you stake, we’ll walk you through C-Ratio maintenance.</ListItem>
      </UnorderedList>
    
                */}
    </>
  );
}
