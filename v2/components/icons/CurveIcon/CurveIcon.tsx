import { FC } from 'react';
import CurveIconImg from './Curve.png';

// Curve's SVG icon is huge so using a png here instead
export const CurveIcon: FC<JSX.IntrinsicElements['img']> = (props) => {
  return <img {...props} src={CurveIconImg} />;
};
