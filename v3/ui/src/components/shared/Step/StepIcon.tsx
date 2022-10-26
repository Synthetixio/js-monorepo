import { chakra, Flex, forwardRef, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { StepStatus } from '../TransactionReview/TransactionReview.types';
import { CheckIcon, CloseIcon } from './Icons';

interface StepIconProps {
  status?: StepStatus;
  children?: React.ReactNode;
}

const MotionFlex = motion(Flex);
const AnimatedCloseIcon = motion(CloseIcon);
const AnimatedSpan = motion(chakra.span);

const animationConfig = {
  transition: {
    duration: 0.25,
  },
  exit: { scale: 0.5, opacity: 0 },
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

export const StepIcon = forwardRef<StepIconProps, 'div'>(({ status, children }, ref) => {
  return useMemo(() => {
    if (status === StepStatus.Error) {
      return <AnimatedCloseIcon color="white" {...animationConfig} />;
    }

    if (status === StepStatus.Completed) {
      return (
        <MotionFlex {...animationConfig}>
          <CheckIcon color="white" />
        </MotionFlex>
      );
    }
    if (status === StepStatus.Current) {
      return <Spinner color="white" width={6} height={6} />;
    }

    return (
      <AnimatedSpan
        __css={{
          fontWeight: 'medium',
          textAlign: 'center',
          fontSize: 'md',
        }}
        ref={ref}
        {...animationConfig}
      >
        {children}
      </AnimatedSpan>
    );
  }, [children, ref, status]);
});
