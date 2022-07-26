import clsx from 'clsx';

export type SkeletonProps = {
  className?: string;
  deafultClassName?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  className = 'ui-w-24 ui-h-6 ui-block',
  deafultClassName = 'ui-bg-gray-300 ui-rounded-md'
}) => <span className={clsx('ui-animate-pulse', deafultClassName, className)} />;
