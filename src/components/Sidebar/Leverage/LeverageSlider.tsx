import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import {
  forwardRef,
  memo,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  ForwardedRef,
  RefObject,
} from "react";
import { maxLeverage } from "../OrderForm";

interface LeverageSliderProps {
  buy: boolean;
  onChange: (
    val: number | null,
    controllingComponent: "input" | "slider",
  ) => void;
}

export type RefHandler = {
  thumbRef: RefObject<HTMLDivElement>;
  trackRef: RefObject<HTMLDivElement>;
};

export const LeverageSlider = memo(
  forwardRef(
    ({ buy, onChange }: LeverageSliderProps, ref: ForwardedRef<RefHandler>) => {
      const [local, setLocalState] = useState(1);
      const thumbRef = useRef<HTMLDivElement>(null);
      const trackRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        onChange(local, "slider");
      }, [local]);

      useImperativeHandle(ref, () => ({
        thumbRef,
        trackRef,
      }));

      return (
        <Box flex="3">
          <Slider
            key="leverageSlider"
            aria-label="sliderBoy"
            onChange={(val) => setLocalState(val)}
            min={1}
            max={maxLeverage}
            defaultValue={1}
          >
            <SliderTrack bg={buy ? "green.900" : "red.900"}>
              <SliderFilledTrack
                bg={buy ? "green.400" : "red.400"}
                ref={trackRef}
              />
            </SliderTrack>
            <SliderThumb boxSize={6} ref={thumbRef} />
          </Slider>
        </Box>
      );
    },
  ),
);
