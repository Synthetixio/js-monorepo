import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

interface LeverageSliderProps {
  buy: boolean;
  leverage: number;
  onChange: (newLeverage: number) => void;
}

export const LeverageSlider = ({
  buy,
  leverage,
  onChange,
}: LeverageSliderProps) => {
  return (
    <Box flex="3">
      <Slider aria-label="slider" value={leverage} onChange={onChange}>
        <SliderTrack bg={buy ? "green.900" : "red.900"}>
          <SliderFilledTrack bg={buy ? "green.400" : "red.400"} />
        </SliderTrack>
        <SliderThumb boxSize={6}></SliderThumb>
      </Slider>
    </Box>
  );
};
