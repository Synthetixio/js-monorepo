import { Box, InputGroup, Input, InputRightAddon } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useContext } from "react";
import { OrderFormContext } from "../OrderForm";

export const LeverageInput = () => {
  const {
    state: { leverage },
    dispatch,
  } = useContext(OrderFormContext);

  const onChange = useCallback((val: ChangeEvent<HTMLInputElement>) => {
    const newLev = isNaN(parseInt(val.target.value))
      ? 1
      : parseInt(val.target.value);
    dispatch({ type: "set_leverage", payload: { leverage: newLev } });
  }, []);

  return (
    <Box flex="1" ml="4">
      <InputGroup width="120px">
        <Input
          key="leverageInput"
          type="number"
          min={1}
          max={100}
          variant="filled"
          value={leverage}
          onChange={onChange}
          onBlur={() => console.log("Blur")}
        />
        <InputRightAddon
          _hover={{ cursor: "pointer" }}
          children="×"
          onClick={() => dispatch({ type: "reset_leverage" })}
        />
      </InputGroup>
    </Box>
  );
};
