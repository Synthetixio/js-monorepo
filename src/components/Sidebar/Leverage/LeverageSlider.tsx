import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { OrderFormContext } from "../OrderForm";

export const LeverageSlider = () => {
  const {
    state: { leverage, buy },
    dispatch,
  } = useContext(OrderFormContext);

  return (
    <Box flex="3">
      <Slider
        key="leverageSlider"
        aria-label="slider"
        value={leverage}
        onChange={(val) =>
          dispatch({ type: "set_leverage", payload: { leverage: val } })
        }
        min={1}
        max={100}
      >
        <SliderTrack bg={buy ? "green.900" : "red.900"}>
          <SliderFilledTrack bg={buy ? "green.400" : "red.400"} />
        </SliderTrack>
        <SliderThumb boxSize={6}></SliderThumb>
      </Slider>
    </Box>
  );
};
