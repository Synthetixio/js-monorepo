import { Box, Text, Flex, Skeleton, useBreakpointValue, Tooltip } from '@chakra-ui/react';
import { CountDown } from '@snx-v2/CountDown';
import { InfoIcon } from '@snx-v2/icons';
import { useTranslation } from 'react-i18next';

interface EpochPriceProps {
  epochEnd?: Date;
  snxPrice?: string;
  isLoading: boolean;
}

export const EpochPrice = ({ epochEnd, snxPrice, isLoading = false }: EpochPriceProps) => {
  const { t } = useTranslation();
  const size = useBreakpointValue(
    {
      base: 'mobile',
      md: 'desktop',
    },
    { fallback: 'md' }
  ) as 'mobile' | 'desktop';

  return (
    <Box bg="navy.900" overflow="fixed">
      <Flex bg="whiteAlpha.200" justifyContent="space-between" px={[4, 4, 10]} py={2}>
        <Flex
          alignItems={['flex-start', 'flex-start', 'center']}
          flexDir={['column', 'column', 'row']}
        >
          <Flex alignItems="center">
            <Text variant="heading" color="whiteAlpha.700" fontSize="2xs" lineHeight="10px">
              {t(`staking-v2.epochprice.epoch-${size}`)}
            </Text>
            {size === 'mobile' && (
              <Tooltip label={t('staking-v2.epochprice.epoch-tooltip')} hasArrow lineHeight="10px">
                <Flex as="span">
                  <InfoIcon ml={1} width="10px" height="10px" color="whiteAlpha.700" />
                </Flex>
              </Tooltip>
            )}
          </Flex>
          <Skeleton
            isLoaded={!isLoading}
            ml={[0, 0, 1.5]}
            width={isLoading ? '40px' : 'unset'}
            height={isLoading ? '10px' : 'unset'}
            sx={{
              display: 'flex',
              span: {
                fontFamily: 'mono',
                fontSize: ['xs', 'xs', '2xs'],
                mt: [1, 1, 0],
                lineHeight: '10px',
                fontWeight: 'bold',
                color: ['whiteAlpha.900', 'whiteAlpha.900', 'white'],
              },
            }}
          >
            {epochEnd && <CountDown toDate={epochEnd} />}
          </Skeleton>
        </Flex>
        <Flex
          alignItems="center"
          flexDir={['column', 'column', 'row']}
          justify={['center', 'center', 'end']}
        >
          <Text variant="heading" color="whiteAlpha.700" fontSize="2xs" lineHeight="10px">
            {t(`staking-v2.epochprice.price-${size}`)}
          </Text>
          <Skeleton
            isLoaded={!isLoading}
            ml={[0, 0, 1.5]}
            mt={[1, 1, 0]}
            width={isLoading ? '40px' : 'unset'}
            height={isLoading ? '10px' : 'unset'}
          >
            <Text
              fontFamily="mono"
              fontSize={['xs', 'xs', '2xs']}
              lineHeight="10px"
              fontWeight="bold"
              color={['whiteAlpha.900', 'whiteAlpha.900', 'white']}
            >
              {snxPrice}
            </Text>
          </Skeleton>
        </Flex>
      </Flex>
    </Box>
  );
};
