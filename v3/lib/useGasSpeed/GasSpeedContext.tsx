import React, {
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

export type GasSpeed = 'average' | 'fast' | 'fastest';
export const GasSpeedContext = createContext<{
  gasSpeed: GasSpeed;
  setGasSpeed: Dispatch<SetStateAction<GasSpeed>>;
}>({
  gasSpeed: 'average',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setGasSpeed: () => {},
});

export const GasSpeedProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [gasSpeed, setGasSpeed] = useState<GasSpeed>('average');
  return (
    <GasSpeedContext.Provider value={{ gasSpeed, setGasSpeed }}>
      {children}
    </GasSpeedContext.Provider>
  );
};

export const useGasSpeed = () => {
  return useContext(GasSpeedContext);
};
