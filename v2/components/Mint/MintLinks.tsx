import { BoxLink } from '@snx-v2/BoxLink';
import { DebtPoolIcon, GuideIcon } from '@snx-v2/icons';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';
import { useTranslation } from 'react-i18next';

export const MintLinks = () => {
  const { t } = useTranslation();
  const { delegateWallet } = useDelegateWallet();
  return (
    <>
      <BoxLink
        icon={<GuideIcon />}
        href="https://blog.synthetix.io/basics-of-staking-snx-2022/"
        isExternal
        subHeadline=""
        headline={t('staking-v2.mint.links.guide')}
      />
      {delegateWallet ? null : (
        <BoxLink
          containerProps={{ mt: '2' }}
          icon={<DebtPoolIcon width="20px" height="20px" color="white" />}
          to="/debt/manage"
          subHeadline=""
          headline={t('staking-v2.mint.links.hedge')}
        />
      )}
    </>
  );
};
