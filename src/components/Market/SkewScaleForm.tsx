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
import { useSetSkewScale } from "../../hooks/useSetSkewScale";

export function SkewScaleForm() {
  const [marketId, setMarketId] = useState("");
  const [scale, setScale] = useState("");
  const toast = useToast({
    isClosable: true,
    duration: 9000,
  });
  const { setSkewScale } = useSetSkewScale(marketId, scale);

  const submit = async () => {
    const tx = await setSkewScale();

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
          Set Skew Scale
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

        <FormControl isRequired>
          <FormLabel>Skew Scale</FormLabel>
          <Input
            value={scale}
            type="number"
            placeholder="100,000"
            onChange={(e) => setScale(e.target.value)}
          />
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit" isDisabled={!marketId}>
          Set Skew Scale
        </Button>
      </Form>
    </Card>
  );
}
