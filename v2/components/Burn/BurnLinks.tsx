import { BridgeIcon, GuideIcon, WreckedIcon } from '@snx-v2/icons';
import { BoxLink } from '@snx-v2/BoxLink';
import { useTranslation } from 'react-i18next';
import { useDelegateWallet } from '@snx-v2/useDelegateWallet';

export const BurnLinks = () => {
  const { t } = useTranslation();
  const { delegateWallet } = useDelegateWallet();
  if (delegateWallet) {
    return (
      <BoxLink
        icon={<GuideIcon />}
        href="https://blog.synthetix.io/basics-of-staking-snx-2022/"
        isExternal
        subHeadline=""
        headline={t('staking-v2.burn.links.guide')}
      />
    );
  }
  return (
    <>
      <BoxLink
        icon={<GuideIcon />}
        href="https://blog.synthetix.io/basics-of-staking-snx-2022/"
        isExternal
        subHeadline=""
        headline={t('staking-v2.burn.links.guide')}
      />
      <BoxLink
        containerProps={{ mt: '2' }}
        icon={<BridgeIcon width="auto" height="20px" color="white" />}
        to="/bridge"
        subHeadline=""
        headline={t('staking-v2.burn.links.bridge')}
      />
      <BoxLink
        containerProps={{ mt: '2' }}
        icon={<WreckedIcon width="auto" height="20px" color="white" />}
        to="/staking/self-liquidation"
        subHeadline=""
        headline={t('staking-v2.burn.links.self-liquidate')}
      />
    </>
  );
};
