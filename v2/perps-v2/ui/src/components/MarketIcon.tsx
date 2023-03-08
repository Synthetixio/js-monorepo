import { Image } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

export const MarketIcon: FC<{ icon: string }> = ({ icon }) => {
  const [loading, setLoading] = useState(true);
  const [component, setComponent] = useState<null | string>(null);
  const getIcon = useCallback(async () => {
    const { default: dataString }: { default: string } = await import('../assets/' + icon + '.svg');
    return dataString;
  }, [icon]);
  useEffect(() => {
    try {
      getIcon().then((element) => setComponent(element));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [getIcon]);

  return <>{loading ? '...loading' : component ? <Image src={component} /> : '?'}</>;
};
