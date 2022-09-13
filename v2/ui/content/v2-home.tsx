import { Box, Flex } from '@chakra-ui/react';
import { Banner } from '@snx-v2/Banner';
import { CRatioHealthCard } from '@snx-v2/CRatioHealthCard';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { BalanceBox } from '../../components/BalanceBox';
import { MainActionCards } from '../../components/MainActionCards';

const V2Home = () => {
  const targetCratioPercentage = 400;
  const currentCRatioPercentage = 400;
  const liquidationCratioPercentage = 150;
  const variant = getHealthVariant({
    targetCratioPercentage,
    currentCRatioPercentage,
    liquidationCratioPercentage,
  });
  const epoch = '0D 14H 08M';
  return (
    <Box>
      <Box height="42px" position="absolute" left="0" right="0">
        <Banner variant={variant} text="You can collect your weekly rewards" countDown={epoch} />
      </Box>
      <Box height="42px" />
      <Flex mt="4" flexDirection={['column', 'column', 'column', 'row']}>
        <Box paddingY="7" paddingX="4" bg="navy.900" flex="1">
          <CRatioHealthCard
            targetCratioPercentage={targetCratioPercentage}
            currentCRatioPercentage={currentCRatioPercentage}
            liquidationCratioPercentage={liquidationCratioPercentage}
          />
          <MainActionCards
            epoch={epoch}
            isFlagged={false}
            hasClaimed={false}
            targetCratioPercentage={targetCratioPercentage}
            currentCRatioPercentage={currentCRatioPercentage}
            liquidationCratioPercentage={liquidationCratioPercentage}
          />
        </Box>
        <Flex
          ml="6"
          alignSelf={['center', 'center', 'center', 'flex-start']}
          maxWidth="287px"
          width="full"
        >
          <BalanceBox snxPrice={3} snxBalance={1000} stakedSnx={900} transferable={800} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default V2Home;
