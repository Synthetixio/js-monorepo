import { Amount } from '@snx-v3/Amount';
import { Button, Flex, Td, Text, Tr, useToast } from '@chakra-ui/react';
import { CollateralIcon } from '@snx-v3/icons';
import { useWithdraw } from '@snx-v3/useWithdraw';
import { useParams } from '@snx-v3/useParams';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { ContractError } from '@snx-v3/ContractError';

function AvailableCollateralRowUi({
  accountCollateral,
  isWithdrawLoading,
  onWithdraw,
}: {
  accountCollateral: any;
  isWithdrawLoading: boolean;
  onWithdraw: () => void;
}) {
  return (
    <Tr>
      <Td>
        <Flex flexDir="row" py={4}>
          <CollateralIcon width="32px" height="32px" symbol={accountCollateral.symbol} />
          <Flex flexDirection="column" justifyContent="center" ml={2}>
            <Text fontSize="lg" color="gray.500">
              <Amount value={accountCollateral.availableCollateral} /> {accountCollateral.symbol}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td textAlign="end">
        <Button isDisabled={isWithdrawLoading} onClick={onWithdraw}>
          Withdraw
        </Button>
      </Td>
    </Tr>
  );
}

export function AvailableCollateralRow({ accountCollateral }: { accountCollateral: any }) {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);

  const { data: CoreProxy } = useCoreProxy();
  const errorParserCoreProxy = useContractErrorParser(CoreProxy);
  const toast = useToast({ isClosable: true, duration: 9000 });

  const withdraw = useWithdraw({
    accountId: params.accountId,
    collateralTypeAddress: collateralType?.tokenAddress,
  });
  const onWithdraw = async () => {
    try {
      await withdraw.exec();
    } catch (error: any) {
      const contractError = errorParserCoreProxy(error);
      if (contractError) {
        console.error(new Error(contractError.name), contractError);
      }
      toast.closeAll();
      toast({
        title: 'Withdraw failed',
        description: contractError ? (
          <ContractError contractError={contractError} />
        ) : (
          'Please try again.'
        ),
        status: 'error',
      });
    }
  };

  return (
    <AvailableCollateralRowUi
      accountCollateral={accountCollateral}
      onWithdraw={onWithdraw}
      isWithdrawLoading={withdraw.isLoading}
    />
  );
}
