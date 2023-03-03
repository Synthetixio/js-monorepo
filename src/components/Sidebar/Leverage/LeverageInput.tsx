import { InputGroup, Input, InputRightAddon, Box } from "@chakra-ui/react";
import { Dispatch, useCallback, useRef } from "react";
import { Actions } from "../OrderForm/reducer";

interface LeverageInputProps {
  leverage?: number;
  dispatch?: Dispatch<Actions>;
}

export const LeverageInput = ({}: LeverageInputProps) => {
  const inputRef = useRef(null);

  const onChange = useCallback((val: number) => {
    console.log("Number");
    // dispatch({
    //   type: "set_leverage",
    //   payload: { leverage: val },
    // });
  }, []);

  console.log("Render", new Date().toISOString());

  return (
    <Box flex="1" ml="4">
      <InputGroup width="120px">
        <Input
          key="leverage"
          type="number"
          min={1}
          max={100}
          variant="filled"
          // value={leverage}
          onChange={(val) => onChange(parseInt(val.target.value))}
          ref={inputRef}
        />
        <InputRightAddon
          _hover={{ cursor: "pointer" }}
          children="×"
          // onClick={() => dispatch({ type: "reset_leverage" })}
        />
      </InputGroup>
    </Box>
  );
};
