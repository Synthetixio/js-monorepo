import { useEffect, FC } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Chart } from '../components/Chart';

export const App: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <>
      <Header />
      <Chart />
    </>
  );
};
