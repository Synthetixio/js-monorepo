import { Box, Button, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Header, Market, Sidebar } from "../components";
import { CreateMarketForm } from "../components/Market/CreateMarketForm";
import { useCreateMarket } from "../hooks/useCreateMarket";
import { useGetMarketInfo } from "../hooks/useGetMarketInfo";

export function Admin() {
  const { address } = useAccount();
  // const { createMarket } = useCreateMarket("Ether", "snxETH", address || "", );
  return (
    <Flex height="100vh" maxHeight="100vh" flexDirection="column">
      <Header />
      <Flex
        m={8}
        align="start"
        direction="row"
        flex="1"
        height="100%"
        minHeight={0}
      >
        <CreateMarketForm />
        {/* <Button onClick={() => createMarket()}>Create</Button> */}
      </Flex>
    </Flex>
  );
}
