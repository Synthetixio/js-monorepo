import { Bridge } from '@socket.tech/plugin';
import { NetworkIdByName } from '@synthetixio/contracts-interface';
import { useTheme } from 'styled-components';
import Connector from 'containers/Connector';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { theme as chakraTheme } from '@synthetixio/v3-theme';
import { Trans } from 'react-i18next';
import { ArrowLeft } from '@snx-v2/icons';

// The widget requires rgb and we have our theme defined in hex
const hexToRgb = (hex: string) => {
  //@ts-ignore
  const rgbString = hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16))
    .join();
  return `rba(${rgbString})`;
};
const sUSDAddressMainnet = '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51';
const sUSDAddressOptimism = '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9';

function SocketBridge({ onBack }: { onBack: () => void }) {
  const { colors } = useTheme();
  const { provider, network } = Connector.useContainer();
  const isL2 = network?.id === NetworkIdByName['mainnet-ovm'];
  const defaultDestNetwork = isL2 ? NetworkIdByName['mainnet'] : NetworkIdByName['mainnet-ovm'];
  const defaultSourceToken = isL2 ? sUSDAddressOptimism : sUSDAddressMainnet;
  const defaultDestToken = isL2 ? sUSDAddressMainnet : sUSDAddressOptimism;
  return (
    <Flex gap="24px" flexDir={{ base: 'column', md: 'row' }}>
      <Flex
        flex={1}
        py="14px"
        px={{ base: '20px', sm: '12px' }}
        borderRadius="base"
        borderWidth="1px"
        borderColor="gray.900"
        bg="navy.700"
      >
        <Bridge
          provider={provider}
          API_KEY="2da36f83-5f0c-43c9-bb65-bf850ecb6ae1"
          defaultSourceToken={defaultSourceToken}
          defaultDestToken={defaultDestToken}
          defaultSourceNetwork={network?.id}
          defaultDestNetwork={defaultDestNetwork}
          title={
            <Flex alignItems="center">
              <Button
                margin="0 auto"
                type="button"
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft color="white" width="16px" height="16px" />}
                color="white"
                p={0}
                onClick={() => onBack()}
              ></Button>
              <Text fontSize="16px" lineHeight="20px" fontWeight={700}>
                <Trans i18nKey="bridge.instant-bridge-title" />
              </Text>
            </Flex>
          }
          customize={{
            responsiveWidth: true,
            borderRadius: 0.2,
            primary: hexToRgb(chakraTheme.colors.navy['700']),
            secondary: hexToRgb(colors.mediumBlue),
            text: hexToRgb(colors.white),
            secondaryText: hexToRgb(colors.white),
            accent: hexToRgb(colors.blueHover),
            onAccent: hexToRgb(colors.white),
            interactive: hexToRgb(colors.grayBlue),
            onInteractive: hexToRgb(colors.white),
            outline: hexToRgb(colors.mediumBlue),
          }}
        />
      </Flex>
      <Flex
        width={['100%', '100%', '100%', '382px']}
        height="140px"
        flexDir="column"
        p="20px"
        borderRadius="base"
        borderWidth="1px"
        borderColor="gray.900"
        bg="navy.700"
        gap="20px"
      >
        <Text fontSize="14px" lineHeight="20px" fontWeight={700}>
          <Trans i18nKey="bridge.powered-by" />
        </Text>
        <Image
          src="/images/socket-logo-full.svg"
          width="108px"
          height="60px"
          alt="instant-bridge"
        />
      </Flex>
    </Flex>
  );
}

export default SocketBridge;
