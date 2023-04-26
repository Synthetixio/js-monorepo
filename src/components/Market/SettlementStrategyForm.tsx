import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Card,
  Heading,
  CardHeader,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";
import { useAddSettlementStrategy } from "../../hooks/useAddSettlementStrategy";

export function SettlementStrategyForm() {
  const [marketId, setMarketId] = useState("");
  const toast = useToast({
    isClosable: true,
    duration: 9000,
  });
  const { addSettlementStrategy } = useAddSettlementStrategy(marketId);

  const submit = async () => {
    const tx = await addSettlementStrategy();

    await tx.wait();

    toast({
      title: "Successfully done",
      status: "success",
      isClosable: true,
      duration: 9000,
    });
  };

  return (
    <Card width={300} p={8}>
      <CardHeader pt={0}>
        <Heading size="md" textAlign="center">
          Add Settlement Strategy
        </Heading>
      </CardHeader>

      <Form onSubmit={submit}>
        <FormControl isRequired>
          <FormLabel>Market Id</FormLabel>
          <Input
            value={marketId}
            placeholder="2"
            onChange={(e) => setMarketId(e.target.value)}
          />
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit" isDisabled={!marketId}>
          Add Settlement Strategy
        </Button>
      </Form>
    </Card>
  );
}
