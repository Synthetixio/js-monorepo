import { Box, Progress, Text, Tooltip } from '@chakra-ui/react';
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
        <Text whiteSpace="nowrap" fontSize="xx-small" transform="translateY(calc(-100% - 10px) )">
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
        bg="gray.400"
        left={`${left}%`}
        top={0}
        bottom={0}
        margin="auto"
      />
    </>
  );
};

type Props = {
  liquidationCratioPercentage: number;
  targetCratioPercentage: number;
  currentCRatioPercentage: number;
};

export const CRatioProgressBar: FC<Props> = ({
  targetCratioPercentage,
  liquidationCratioPercentage,
  currentCRatioPercentage,
}) => {
  const maxRatioShown = Math.max(targetCratioPercentage, currentCRatioPercentage) * 1.1;
  const scaleFactor = maxRatioShown / 100;
  const variant = getHealthVariant({
    targetCratioPercentage,
    liquidationCratioPercentage,
    currentCRatioPercentage,
  });

  return (
    <Box position="relative" height="100px" width="full">
      <LineWithText
        left={liquidationCratioPercentage / scaleFactor}
        text={`Liquidated < ${liquidationCratioPercentage.toFixed(0)}%`}
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
          position="absolute"
          right={0}
          top={0}
          transform="translate(50%,-100%)"
          color={variant}
        />
        <TriangleUpIcon
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
