import IconSrc from './dsnx-token-icon.webp';
export const DSNXIcon = ({
  width = '20px',
  height = '20px',
}: {
  width?: string;
  height?: string;
}) => {
  return <img width={width} height={height} src={IconSrc} />;
};
