import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { BorrowIcon, DollarCircle } from '@snx-v3/icons';
import { useParams } from '@snx-v3/useParams';
import { FC, PropsWithChildren } from 'react';
import { useSearchParams } from 'react-router-dom';

const ActionButton: FC<
  PropsWithChildren<{
    onClick: (action: string) => void;
    action: string;
    activeAction?: string;
  }>
> = ({ children, action, activeAction, onClick }) => (
  <BorderBox
    as={Button}
    fontWeight="700"
    fontSize="lg"
    color="white"
    _hover={{
      bg: 'whiteAlpha.100',
    }}
    _active={{
      bg: 'whiteAlpha.100',
    }}
    cursor="pointer"
    bg={activeAction === action ? 'whiteAlpha.100' : 'none'}
    onClick={() => onClick(action)}
    py={2}
    width="50%"
    textAlign="center"
  >
    {children}
  </BorderBox>
);

const Action: FC<{ manageAction: string }> = ({ manageAction }) => {
  switch (manageAction) {
    case 'borrow':
      return <Text>Borrow</Text>;
    case 'deposit':
      return <Text>Deposit</Text>;
    case 'repay':
      return <Text>Repay</Text>;
    case 'withdraw':
      return <Text>Withdraw</Text>;

    default:
      return null;
  }
};

const ManageActionUi: FC<{
  setActiveAction: (action: string) => void;
  manageAction?: string;
}> = ({ setActiveAction, manageAction }) => {
  return (
    <Box>
      <Flex mt={2} gap={2}>
        <ActionButton onClick={setActiveAction} action="deposit" activeAction={manageAction}>
          <ArrowDownIcon w="15px" h="15px" mr={1} /> Deposit Collateral
        </ActionButton>
        <ActionButton onClick={setActiveAction} action="repay" activeAction={manageAction}>
          <DollarCircle mr={1} /> Repay snxUSD
        </ActionButton>
      </Flex>
      <Flex mt={2} gap={2}>
        <ActionButton onClick={setActiveAction} action="withdraw" activeAction={manageAction}>
          <ArrowUpIcon w="15px" h="15px" mr={1} /> Withdraw Collateral
        </ActionButton>
        <ActionButton onClick={setActiveAction} action="borrow" activeAction={manageAction}>
          <BorrowIcon mr={1} /> Borrow snxUSD
        </ActionButton>
      </Flex>
      {manageAction ? (
        <Flex direction="column" mt={4}>
          <Action manageAction={manageAction} />
        </Flex>
      ) : null}
    </Box>
  );
};
export const ManageAction = () => {
  const params = useParams();
  const [_, setQueryParam] = useSearchParams();
  return (
    <ManageActionUi
      setActiveAction={(action) => setQueryParam({ manageAction: action })}
      manageAction={params.manageAction}
    />
  );
};
