import { InputGroup, Input, InputRightAddon, Box } from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { formValues } from "../OrderForm";

interface LeverageInputProps {
  name: string;
}

export const LeverageInput = ({ name }: LeverageInputProps) => {
  const {
    values: { leverage },
    setFieldValue,
  } = useFormikContext<formValues>();

  return (
    <Box flex="1" ml="4">
      <InputGroup width="120px">
        <Field
          as={Input}
          id="leverage"
          name={name}
          type="number"
          variant="filled"
        />
        <InputRightAddon
          _hover={{ cursor: "pointer" }}
          children="×"
          onClick={() => setFieldValue(name, "1")}
        />
      </InputGroup>
    </Box>
  );
};
