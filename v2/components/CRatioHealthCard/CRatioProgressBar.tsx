import { Box, Progress, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { getHealthVariant } from '@snx-v2/getHealthVariant';
import { InfoIcon, TriangleDownIcon, TriangleUpIcon } from '@snx-v2/icons';

const LineWithText: FC<{ left: number; text: string; tooltipText: string }> = ({
  left,
  text,
  tooltipText,
}) => {
  return (
    <>
      <Box
        position="absolute"
        height="40%"
        transform="translateX(-50%)"
        left={`${left}%`}
        top={0}
        bottom={0}
        margin="auto"
      >
        <Text
          color="gray.700"
          whiteSpace="nowrap"
          fontSize="xx-small"
          transform="translateY(calc(-100% - 10px) )"
        >
          {text}{' '}
          <Tooltip label={tooltipText} hasArrow>
            <span>
              <InfoIcon />
            </span>
          </Tooltip>
        </Text>
      </Box>
      <Box
        position="absolute"
        height="40%"
        width="1px"
        bg="gray.900"
        left={`${left}%`}
        top={0}
        bottom={0}
        margin="auto"
      />
    </>
  );
};

export const CRatioProgressBar: FC<{
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
  targetThreshold: number;
  isLoading: boolean;
}> = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
  targetThreshold,
  isLoading,
}) => {
  const maxRatioShown = Math.min(
    Math.max(targetCratioPercentage, currentCRatioPercentage) * 1.1,
    // If the c-ratio is bigger than 2.5x the target ratio the target and liquidation labels will overlap due to the big scale difference.
    // So when this is the case we opt not to show the current c-ratio arrows and set maxRatioShown to target * 2.5.
    targetCratioPercentage * 2.5
  );
  const scaleFactor = maxRatioShown / 100;

  const variant = getHealthVariant({
    targetCratioPercentage,
    liquidationCratioPercentage,
    currentCRatioPercentage,
    targetThreshold,
  });

  return (
    <Box
      position="relative"
      height="100px"
      width="full"
      data-testid="c ratio progressbar"
      overflowX="hidden"
    >
      <>
        <LineWithText
          left={!isLoading ? liquidationCratioPercentage / scaleFactor : 33}
          text={
            !isLoading ? `Liquidation < ${liquidationCratioPercentage.toFixed(0)}%` : 'Liquidation'
          }
          tooltipText="You may be flagged for liquidation"
        />
        <LineWithText
          left={!isLoading ? targetCratioPercentage / scaleFactor : 66}
          text={!isLoading ? `Target ${targetCratioPercentage.toFixed(0)}%` : 'Target'}
          tooltipText="Required to claim rewards"
        />
      </>

      <Skeleton
        variant={variant}
        top={0}
        bottom={0}
        height="12px"
        position="absolute"
        margin="auto"
        width="100%"
        isLoaded={!isLoading}
      >
        <Progress
          variant={variant}
          top={0}
          bottom={0}
          height="12px"
          position="absolute"
          margin="auto"
          width="100%"
          value={currentCRatioPercentage / scaleFactor}
        />
      </Skeleton>
      <Box
        bg={variant}
        height="12px"
        position="absolute"
        left={`${currentCRatioPercentage / scaleFactor}%`}
        top={0}
        bottom={0}
        margin="auto"
      >
        {currentCRatioPercentage > 0 && !isLoading && (
          <>
            <TriangleDownIcon
              data-testid="current c-ration triangle"
              position="absolute"
              right={0}
              top={0}
              transform="translate(50%,-100%)"
              color={variant}
            />
            <TriangleUpIcon
              data-testid="current c-ration triangle"
              position="absolute"
              right={0}
              bottom={0}
              transform="translate(50%,100%)"
              color={variant}
            />
          </>
        )}
      </Box>
    </Box>
  );
};
