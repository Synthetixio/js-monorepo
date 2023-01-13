import { Box, Spinner } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { MultistepStatus } from './MultistepStatus';

import { createIcon } from '@chakra-ui/icon';

export const CheckIcon = createIcon({
  viewBox: '0 0 14 14',
  path: (
    <g fill="currentColor">
      <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
    </g>
  ),
});

export const CloseIcon = createIcon({
  d: 'M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z',
});

export function StepIcon({ status, children }: PropsWithChildren<{ status: MultistepStatus }>) {
  switch (true) {
    case status.failed:
      return <CloseIcon color="white" />;
    case status.success:
      return <CheckIcon color="white" />;
    case status.loading:
      return <Spinner color="white" width={6} height={6} />;
    case status.disabled:
    default:
      return (
        <Box
          __css={{
            display: 'inline',
            fontWeight: 'medium',
            textAlign: 'center',
            fontSize: 'md',
          }}
        >
          {children}
        </Box>
      );
  }
}
