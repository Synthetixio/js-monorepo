import { Skeleton, SkeletonProps } from '@chakra-ui/react';
import { FC } from 'react';

interface Props extends SkeletonProps {
  value: any | undefined;
  isLoading?: boolean;
}

export const LoadableValue: FC<Props> = ({ value, isLoading, ...props }) => {
  if (isLoading || value === undefined) return <Skeleton height="20px" my={1} {...props} />;

  return <>{value}</>;
};
