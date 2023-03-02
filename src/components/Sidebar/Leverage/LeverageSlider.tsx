import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { Field, FormikProps, useFormikContext } from "formik";
import { useEffect } from "react";
import { formValues } from "../OrderForm";

interface LeverageSliderProps {
  buy: boolean;
  name: string;
}

export const LeverageSlider = ({ buy, name }: LeverageSliderProps) => {
  const {
    values: { leverage },
    setFieldValue,
  } = useFormikContext<formValues>();

  return (
    <Box flex="3">
      <Slider
        aria-label="slider"
        value={leverage}
        onChange={(val) => {
          setFieldValue(name, val, false);
        }}
      >
        <SliderTrack bg={buy ? "green.900" : "red.900"}>
          <SliderFilledTrack bg={buy ? "green.400" : "red.400"} />
        </SliderTrack>
        <SliderThumb boxSize={6}></SliderThumb>
      </Slider>
    </Box>
  );
};
