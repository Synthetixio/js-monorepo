import { Image, ImageProps } from '@chakra-ui/react';
import { FC } from 'react';
import CurveIconImg from './Curve.png';

// Curve's SVG icon is huge so using a png here instead
export const CurveIcon: FC<ImageProps> = (props) => {
  return <Image {...props} src={CurveIconImg} />;
};
