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
          <Tooltip label={tooltipText} bg="gray.900" hasArrow>
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
  liquidationCratioPercentage?: number;
  targetCratioPercentage?: number;
  currentCRatioPercentage?: number;
}> = ({ targetCratioPercentage, liquidationCratioPercentage, currentCRatioPercentage }) => {
  if (
    liquidationCratioPercentage === undefined ||
    targetCratioPercentage === undefined ||
    currentCRatioPercentage === undefined
  ) {
    return <Skeleton w="100%" minHeight="100px" mb={4} />;
  }
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
  });

  return (
    <Box
      position="relative"
      height="100px"
      width="full"
      data-testid="c ratio progressbar"
      overflowX="hidden"
    >
      <LineWithText
        left={liquidationCratioPercentage / scaleFactor}
        text={`Liquidation < ${liquidationCratioPercentage.toFixed(0)}%`}
        tooltipText="You may be flagged for liquidation"
      />
      <LineWithText
        left={targetCratioPercentage / scaleFactor}
        text={`Target ${targetCratioPercentage.toFixed(0)}%`}
        tooltipText="Required to claim rewards"
      />
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
      <Box
        bg={variant}
        height="12px"
        position="absolute"
        left={`${currentCRatioPercentage / scaleFactor}%`}
        top={0}
        bottom={0}
        margin="auto"
      >
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
      </Box>
    </Box>
  );
};
