import { useContext, FC, PropsWithChildren } from 'react';
import { Box, Skeleton, Link, Flex, LinkProps } from '@chakra-ui/react';
import { ContractContext } from '@snx-v2/ContractContext';
import { useProxyERC20sUSD, NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { ArrowTopRight, CowSwapIcon, CurveIcon, OneInchIcon, SushiSwapLogo } from '@snx-v2/icons';

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
    display="flex"
    justifyContent="flex-start"
    alignItems="center"
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

const StyledArrow = () => <ArrowTopRight width="17px" height="20px" ml={6} color="white" />;

export const SwapLinksUi: FC<{
  outputCurrencyAddress?: string;
  networkId?: number;
}> = ({ outputCurrencyAddress, networkId }) => {
  if (!networkId || !outputCurrencyAddress) {
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
      <StyledLink data-testid="oneInchLink" isExternal={true} href={SWAP_LINKS.oneInch(networkId)}>
        <IconWrapper>
          <OneInchIcon />
        </IconWrapper>
        1inch Network <StyledArrow />
      </StyledLink>
      <StyledLink data-testid="curveLink" isExternal={true} href={SWAP_LINKS.curve(networkId)}>
        <IconWrapper>
          <CurveIcon />
        </IconWrapper>
        Curve Finance <StyledArrow />
      </StyledLink>
      {NetworkIdByName.mainnet === networkId && (
        <StyledLink
          data-testid="cowSwapLink"
          isExternal={true}
          href={SWAP_LINKS.cowSwap(outputCurrencyAddress)}
        >
          <IconWrapper>
            <CowSwapIcon />
          </IconWrapper>
          CowSwap <StyledArrow />
        </StyledLink>
      )}
      <StyledLink
        data-testid="sushiSwapLink"
        isExternal={true}
        href={SWAP_LINKS.sushiSwap(outputCurrencyAddress)}
      >
        <IconWrapper>
          <SushiSwapLogo />
        </IconWrapper>
        SushiSwap <StyledArrow />
      </StyledLink>
    </Flex>
  );
};
export const SwapLinks = () => {
  const { networkId } = useContext(ContractContext);
  const { data } = useProxyERC20sUSD();

  return <SwapLinksUi networkId={networkId ?? undefined} outputCurrencyAddress={data?.address} />;
};
