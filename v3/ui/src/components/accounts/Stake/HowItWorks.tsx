import { CollateralType } from '../../../utils/types';
import { Heading, Link, UnorderedList, ListItem } from '@chakra-ui/react';
import { BigNumber, utils } from 'ethers';
import { useTranslation } from 'react-i18next';

export default function HowItWorks({
  selectedCollateralType,
}: {
  selectedCollateralType: CollateralType;
}) {
  const { t } = useTranslation();
  const formatValue = (value: BigNumber, decimals: number) =>
    parseInt(utils.formatUnits(value, decimals));

  return (
    <>
      <Heading
        size="xs"
        mb="3"
        color="gray.300"
        fontWeight="300"
        textTransform="uppercase"
        letterSpacing="1.5px"
      >
        {t('home.stake.howItWorks.title')}
      </Heading>
      <UnorderedList>
        <ListItem mb="2">
          By default, your staking position will be managed by the <Link>Spartan Council</Link>, a
          DAO elected by stakers of SNX.{' '}
          <Link
            fontWeight="semibold"
            color="blue.400"
            isExternal
            href="https://governance.synthetix.io"
          >
            {t('home.stake.howItWorks.goVote')}
          </Link>
        </ListItem>
        {selectedCollateralType && (
          <ListItem mb="2">
            <>
              Currently, your projected rewards are{' '}
              <strong>X% APY in sUSD plus Y% APY in SNX</strong> and you’ll need to maintain a
              C-Ratio of at least{' '}
              {formatValue(
                BigNumber.from(selectedCollateralType!.minimumCRatio!).mul(BigNumber.from(100)),
                selectedCollateralType.decimals
              ).toFixed(0)}
              %.
            </>
          </ListItem>
        )}
        <ListItem mb="2">Once you stake, we’ll walk you through C-Ratio maintenance.</ListItem>
      </UnorderedList>
    </>
  );
}
