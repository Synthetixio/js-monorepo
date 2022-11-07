import { useContext, FC, PropsWithChildren } from 'react';
import { Box, Skeleton, Link, Flex, LinkProps, Text, Button } from '@chakra-ui/react';
import { ContractContext } from '@snx-v2/ContractContext';
import { useProxyERC20sUSD, NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import {
  ArrowTopRight,
  CowSwapIcon,
  CurveIcon,
  OneInchIcon,
  SUSDIcon,
  SushiSwapLogo,
} from '@snx-v2/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { useDebtData } from '@snx-v2/useDebtData';
import { formatNumber } from '@snx-v2/formatters';

export const SWAP_LINKS = {
  oneInch: (networkId: number) => `https://app.1inch.io/#/${networkId}/unified/swap/ETH/sUSD`,
  curve: (networkId: number) =>
    networkId === NetworkIdByName.mainnet
      ? 'https://curve.fi/susdv2'
      : `https://optimism.curve.fi/factory/0`,
  cowSwap: (outputCurrencyAddress: string) =>
    `https://swap.cow.fi/#/swap?inputCurrency=ETH&outputCurrency=${outputCurrencyAddress}&chain=mainnet`,
  sushiSwap: (outputCurrencyAddress: string) =>
    `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${outputCurrencyAddress}`,
};

const StyledLink: FC<LinkProps> = (props) => (
  <Link
    {...props}
    padding={4}
    bg="whiteAlpha.100"
    borderRadius="10px"
    border="1px"
    borderColor="gray.900"
    mb={2}
  />
);

const IconWrapper: FC<PropsWithChildren> = ({ children }) => (
  <Flex
    boxSize="48px"
    border="1px"
    borderColor="whiteAlpha.300"
    borderRadius="6px"
    alignItems="center"
    justifyContent="center"
    mr={4}
  >
    {children}
  </Flex>
);

const StyledArrow = () => <ArrowTopRight width="17px" height="20px" mr={2} color="white" />;

export const SwapLinksUi: FC<{
  outputCurrencyAddress?: string;
  networkId?: number;
  sUSDToGetBackToTarget?: number;
}> = ({ outputCurrencyAddress, networkId, sUSDToGetBackToTarget }) => {
  const { t } = useTranslation();
  if (!networkId || !outputCurrencyAddress || !sUSDToGetBackToTarget) {
    return (
      <Box>
        <Skeleton height="82px" mb={2} width="full" borderRadius="10px" />
        <Skeleton height="82px" mb={2} width="full" borderRadius="10px" />
        <Skeleton height="82px" mb={2} width="full" borderRadius="10px" />
      </Box>
    );
  }
  return (
    <Flex bg="navy.900" flexDirection="column">
      <Box mb={2} padding={4} borderRadius="10px" border="1px" borderColor="gray.900">
        <Text fontWeight="500" color="gray.500" fontSize="sm">
          {t('staking-v2.swap-links.susd-needed')}
        </Text>
        <Flex alignItems="center">
          <SUSDIcon />
          <Text data-testid="sUSDToGetBackToTarget" ml={2} fontSize="2xl">
            {formatNumber(Math.ceil(sUSDToGetBackToTarget))}
          </Text>
        </Flex>
      </Box>
      <StyledLink data-testid="oneInchLink" isExternal={true} href={SWAP_LINKS.oneInch(networkId)}>
        <Flex justifyContent="space-between" width="full" alignItems="center">
          <Flex alignItems="center">
            <IconWrapper>
              <OneInchIcon />
            </IconWrapper>
            1inch Network
          </Flex>
          <StyledArrow />
        </Flex>
      </StyledLink>
      <StyledLink data-testid="curveLink" isExternal={true} href={SWAP_LINKS.curve(networkId)}>
        <Flex justifyContent="space-between" width="full" alignItems="center">
          <Flex alignItems="center">
            <IconWrapper>
              <CurveIcon />
            </IconWrapper>
            Curve Finance
          </Flex>
          <StyledArrow />
        </Flex>
      </StyledLink>
      {NetworkIdByName.mainnet === networkId && (
        <StyledLink
          data-testid="cowSwapLink"
          isExternal={true}
          href={SWAP_LINKS.cowSwap(outputCurrencyAddress)}
        >
          <Flex justifyContent="space-between" width="full" alignItems="center">
            <Flex alignItems="center">
              <IconWrapper>
                <CowSwapIcon />
              </IconWrapper>
              CowSwap
            </Flex>
            <StyledArrow />
          </Flex>
        </StyledLink>
      )}
      <StyledLink
        data-testid="sushiSwapLink"
        isExternal={true}
        href={SWAP_LINKS.sushiSwap(outputCurrencyAddress)}
      >
        <Flex justifyContent="space-between" width="full" alignItems="center">
          <Flex alignItems="center">
            <IconWrapper>
              <SushiSwapLogo />
            </IconWrapper>
            SushiSwap
          </Flex>
          <StyledArrow />
        </Flex>
      </StyledLink>

      <Text>
        <Trans
          i18nKey="staking-v2.swap-links.once-purchased-text"
          components={[<Link color="cyan.400" as={ReactRouterLink} to="/staking/burn" />]}
        />
      </Text>
      <Box>
        <Button
          variant="link"
          as={ReactRouterLink}
          to="/staking/unflag"
          border="1px"
          borderColor="cyan.500"
          paddingLeft={4}
          paddingRight={4}
          height={8}
          fontSize="sm"
          mt={2}
        >
          {t('staking-v2.back-btn')}
        </Button>
      </Box>
    </Flex>
  );
};
export const SwapLinks = () => {
  const { networkId } = useContext(ContractContext);
  const { data } = useProxyERC20sUSD();
  const { data: debtData } = useDebtData();
  const sUSDToGetBackToTarget = debtData
    ? debtData.debtBalance.sub(debtData.issuableSynths).toNumber()
    : undefined;

  return (
    <SwapLinksUi
      networkId={networkId ?? undefined}
      sUSDToGetBackToTarget={sUSDToGetBackToTarget}
      outputCurrencyAddress={data?.address}
    />
  );
};
