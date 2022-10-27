import { FC } from 'react';
import CurveIconImg from './curve-white.png';
// Curve's SVG icon is huge so using a png here instead
export const CurveWhiteIcon: FC<JSX.IntrinsicElements['img']> = (props) => {
  return <img width="40px" height="40px" {...props} src={CurveIconImg} />;
};
