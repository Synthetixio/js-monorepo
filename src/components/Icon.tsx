import React from 'react';

interface IconProps {
  size: 'small' | 'medium' | 'large' | 'biggest';
  source: string;
}

const Icon = ({ size, source }: IconProps) => {
  const determineSize = (size: IconProps['size']) => {
    switch (size) {
      case 'small':
        return '0.33rem';
      case 'medium':
        return '0.66rem';
      case 'large':
        return '1rem';
      case 'biggest':
        return '1.33rem';
      default:
        return '1rem';
    }
  };
  // TODO @MF can we do a svg as source?
  return (
    <img
      width={determineSize(size)}
      height={determineSize(size)}
      src={source}
    />
  );
};

export default Icon;
