import BridgeSectionItem, { TagItemProps } from './BridgeSectionItem';
import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BridgeTypeEnum } from '../../constants/enums';

const BridgeSections = ({
  setCurrentBridge,
}: {
  setCurrentBridge: (bridge?: BridgeTypeEnum) => void;
}) => {
  const { t } = useTranslation();
  const handleNativeBridge = () => {
    setCurrentBridge(BridgeTypeEnum.NATIVE);
  };

  const handleInstantBridge = () => {
    setCurrentBridge(BridgeTypeEnum.INSTANT);
  };

  const nativeBridgeTags: TagItemProps[] = [
    {
      label: t('bridge.no-fees'),
      bgColor: 'purple.700',
    },
    { label: t('bridge.no-slippage'), bgColor: 'purple.700' },
    { label: t('bridge.delay-note'), bgColor: 'gray.900' },
  ];

  return (
    <Flex flexDir={['column', 'column', 'column', 'row']} alignItems="stretch" gap="24px">
      <BridgeSectionItem
        logo="/images/synthetix-logo.svg"
        label={t('bridge.native-bridge-title')}
        description={t('bridge.native-bridge-desc')}
        tags={nativeBridgeTags}
        btnText={t('bridge.btn-native-bridge')}
        handleClick={handleNativeBridge}
      />
      <BridgeSectionItem
        logo="/images/socket-logo.svg"
        label={t('bridge.instant-bridge-title')}
        subtitle={t('bridge.instant-bridge-subtitle')}
        description={t('bridge.instant-bridge-desc')}
        btnText={t('bridge.btn-instant-bridge')}
        handleClick={handleInstantBridge}
      />
    </Flex>
  );
};

export default BridgeSections;
