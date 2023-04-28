import { Box, InputGroup, Input, InputRightAddon } from "@chakra-ui/react";
import { forwardRef, ForwardedRef, memo, useEffect, useState } from "react";

interface LeverageInputProps {
  onChange: (
    val: number | null,
    controllingComponent: "input" | "slider",
  ) => void;
  reset: () => void;
}

export const LeverageInput = memo(
  forwardRef(
    (
      { onChange, reset }: LeverageInputProps,
      ref: ForwardedRef<HTMLInputElement>,
    ) => {
      const [local, setLocalState] = useState("1");

      useEffect(() => {
        const newVal = isNaN(parseInt(local)) ? null : parseInt(local);
        onChange(newVal, "input");
      }, [local]);

      return (
        <Box flex="1" ml="4">
          <InputGroup width="120px">
            <Input
              key="leverageInput"
              type="number"
              variant="filled"
              min={1}
              max={100}
              ref={ref}
              onChange={(val) => setLocalState(val.target.value)}
              defaultValue={1}
            />
            <InputRightAddon
              _hover={{ cursor: "pointer" }}
              children="×"
              onClick={reset}
            />
          </InputGroup>
        </Box>
      );
    },
  ),
);
