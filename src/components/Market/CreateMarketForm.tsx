import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Card,
  Heading,
  CardHeader,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import { Form } from "react-router-dom";
import { useAccount } from "wagmi";
import { useToast } from "@chakra-ui/react";
import { useCreateMarket } from "../../hooks/useCreateMarket";

export function CreateMarketForm() {
  const { address } = useAccount();
  const [marketName, setMarketName] = useState("");
  const [marketSymbol, setMarketSymbol] = useState("");
  const [marketOwner, setMarketOwner] = useState(address || "");
  const { createMarket } = useCreateMarket(
    marketName,
    marketSymbol,
    marketOwner,
    (id) => {
      toast({
        title: "Your Account is created",
        description: `Account id: #${id}`,
        status: "success",
        isClosable: true,
        duration: 18000,
      });
    },
  );

  const toast = useToast({
    isClosable: true,
    duration: 9000,
  });

  const submit = () => {
    createMarket();
  };

  return (
    <Card width={500} p={8}>
      <CardHeader pt={0}>
        <Heading size="md" textAlign="center">
          Create Market
        </Heading>
      </CardHeader>

      <Form onSubmit={submit}>
        <FormControl isRequired>
          <FormLabel>Market Name</FormLabel>
          <Input
            value={marketName}
            placeholder="Ether"
            onChange={(e) => setMarketName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Market Symbol</FormLabel>
          <Input
            value={marketSymbol}
            placeholder="snxETH"
            onChange={(e) => setMarketSymbol(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Market Symbol</FormLabel>
          <Input
            value={marketOwner}
            placeholder={ethers.constants.AddressZero}
            onChange={(e) => setMarketOwner(e.target.value)}
          />
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          isDisabled={!marketName || !marketSymbol || !marketOwner}
        >
          Create Market
        </Button>
      </Form>
    </Card>
  );
}
