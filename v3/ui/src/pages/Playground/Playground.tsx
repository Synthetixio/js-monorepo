/* eslint-disable no-console */

import { Box, Button, Input, Select, Text, useToast } from '@chakra-ui/react';
import { useAccounts } from '@snx-v3/useAccounts';
import { useCollateralTypes } from '@snx-v3/useCollateralTypes';
import { usePreferredPool } from '@snx-v3/usePreferredPool';
import { ethers } from 'ethers';
import React from 'react';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useSigner } from '@snx-v3/useBlockchain';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import intlFormat from 'date-fns/intlFormat';
import { useAllowance } from '@snx-v3/useAllowance';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { Amount } from '@snx-v3/Amount';
import { createSearchParams, generatePath, useNavigate } from 'react-router-dom';
import { useParams } from '@snx-v3/useParams';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';
import { useAccountCollateralUnlockDate } from '@snx-v3/useAccountCollateralUnlockDate';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { ContractError } from '@snx-v3/ContractError';

function AccountSelector() {
  const params = useParams();
  const { data: accounts = [] } = useAccounts();
  const navigate = useNavigate();

  return (
    <Select
      placeholder="Select Account"
      value={params.accountId}
      onChange={(e) => {
        navigate({
          pathname: generatePath('/playground'),
          search: createSearchParams({ ...params, accountId: e.target.value }).toString(),
        });
      }}
      display="inline-block"
      width="20em"
      mr="1em"
    >
      {accounts.map((accountId) => (
        <option key={accountId} value={accountId}>
          {accountId}
        </option>
      ))}
    </Select>
  );
}

function CollateralSelector() {
  const params = useParams();
  const { data: collateralTypes = [] } = useCollateralTypes();
  const navigate = useNavigate();

  return (
    <Select
      placeholder="Select Collateral"
      value={params.symbol}
      onChange={(e) => {
        navigate({
          pathname: generatePath('/playground'),
          search: createSearchParams({ ...params, symbol: e.target.value }).toString(),
        });
      }}
      display="inline-block"
      width="20em"
      mr="1em"
    >
      {collateralTypes.map((collateral) => (
        <option key={collateral.symbol} value={collateral.symbol}>
          {collateral.symbol}
        </option>
      ))}
    </Select>
  );
}

export function Playground() {
  const signer = useSigner();
  const { data: CoreProxy } = useCoreProxy();

  const params = useParams();
  const { data: accounts = [], refetch: refetchAccounts } = useAccounts();
  const [accountId] = accounts.filter((id) => id === params.accountId);

  const { data: collateralTypes = [] } = useCollateralTypes();
  const symbol = params.symbol;
  const [{ tokenAddress } = { tokenAddress: undefined }] = collateralTypes.filter(
    (collateral) => collateral.symbol === symbol
  );

  const { data: preferredPool } = usePreferredPool();

  const accountCollateral = useAccountCollateral({ accountId });
  const accountCollateralData = accountCollateral.data?.find(
    (collateral) => collateral.tokenAddress === tokenAddress
  );

  const accountCollateralUnlockDate = useAccountCollateralUnlockDate({ accountId });

  const allowance = useAllowance({ contractAddress: tokenAddress, spender: CoreProxy?.address });
  const tokenBalance = useTokenBalance(tokenAddress);

  const formatTimeToUnlock = React.useCallback(
    () =>
      accountCollateralUnlockDate.data && accountCollateralUnlockDate.data.getTime() > Date.now()
        ? formatDistanceToNow(accountCollateralUnlockDate.data, { addSuffix: true })
        : '~',
    [accountCollateralUnlockDate.data]
  );
  const [timeToUnlock, setTimeToUnlock] = React.useState(formatTimeToUnlock());
  React.useEffect(() => {
    const interval = setInterval(() => setTimeToUnlock(formatTimeToUnlock()), 1_000);
    return () => clearInterval(interval);
  }, [formatTimeToUnlock]);

  const approve = async () => {
    if (!CoreProxy || !signer || !tokenAddress) throw 'OMG';
    const TokenContract = new ethers.Contract(
      tokenAddress,
      ['function approve(address spender, uint256 amount) returns (bool)'],
      signer
    );
    const tx = await TokenContract.approve(CoreProxy.address, ethers.constants.MaxUint256);
    console.log({ tx });
    const result = await tx.wait();
    console.log({ result });

    allowance.refetch();
  };

  const toast = useToast({ isClosable: true, duration: 9000 });
  const errorParserCoreProxy = useContractErrorParser(CoreProxy);

  const createAccount = async () => {
    if (accountId || !CoreProxy) throw 'OMG';
    try {
      const accountId = parseInt(`31337${Math.floor(Math.random() * 10000000000)}`);
      const tx = await CoreProxy['createAccount(uint128)'](accountId);
      console.log({ tx });
      const result = await tx.wait();
      console.log({ result });
      refetchAccounts();
    } catch (e: any) {
      const contractError = errorParserCoreProxy(e);
      if (contractError) {
        console.error(new Error(contractError.name), contractError);
      }
      toast.closeAll();
      toast({
        title: 'Create account failed',
        description: contractError ? (
          <ContractError contractError={contractError} />
        ) : (
          'Please try again.'
        ),
        status: 'error',
      });
    }
  };

  const deposit = async () => {
    const $input: HTMLInputElement | null = document.querySelector('[name="deposit"]');
    if (!$input || !accountId || !tokenAddress || !CoreProxy) throw 'OMG';

    try {
      const tx = await CoreProxy.deposit(
        ethers.BigNumber.from(accountId),
        tokenAddress,
        ethers.utils.parseEther($input.value)
      );
      console.log({ tx });
      const result = await tx.wait();
      console.log({ result });
      tokenBalance.refetch();
      accountCollateral.refetch();
    } catch (e: any) {
      const contractError = errorParserCoreProxy(e);
      if (contractError) {
        console.error(new Error(contractError.name), contractError);
      }
      toast.closeAll();
      toast({
        title: 'Deposit failed',
        description: contractError ? (
          <ContractError contractError={contractError} />
        ) : (
          'Please try again.'
        ),
        status: 'error',
      });
    }
  };

  const delegate = async () => {
    const $input: HTMLInputElement | null = document.querySelector('[name="delegate"]');
    if (!$input || !preferredPool?.id || !accountId || !tokenAddress || !CoreProxy) throw 'OMG';

    try {
      const tx = await CoreProxy.delegateCollateral(
        ethers.BigNumber.from(accountId),
        ethers.BigNumber.from(preferredPool.id),
        tokenAddress,
        ethers.utils.parseEther($input.value),
        ethers.utils.parseEther(`1`)
      );
      console.log({ tx });
      const result = await tx.wait();
      console.log({ result });
      accountCollateral.refetch();
    } catch (e: any) {
      const contractError = errorParserCoreProxy(e);
      if (contractError) {
        console.error(new Error(contractError.name), contractError);
      }
      toast.closeAll();
      toast({
        title: 'Delegate failed',
        description: contractError ? (
          <ContractError contractError={contractError} />
        ) : (
          'Please try again.'
        ),
        status: 'error',
      });
    }
  };

  const withdraw = async () => {
    const $input: HTMLInputElement | null = document.querySelector('[name="withdraw"]');
    if (!$input || !accountId || !tokenAddress || !CoreProxy) throw 'OMG';

    try {
      const tx = await CoreProxy.withdraw(
        ethers.BigNumber.from(accountId),
        tokenAddress,
        ethers.utils.parseEther($input.value)
      );
      console.log({ tx });
      const result = await tx.wait();
      console.log({ result });
      tokenBalance.refetch();
      accountCollateral.refetch();
    } catch (e: any) {
      const contractError = errorParserCoreProxy(e);
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
    <>
      <Box p={1} verticalAlign="middle">
        <AccountSelector />
        <Button onClick={createAccount}>Create account</Button>
      </Box>

      <Box p={1} verticalAlign="middle">
        <CollateralSelector />
        {tokenAddress ? (
          <>
            <Input
              disabled
              type="text"
              name="accountId"
              value={allowance.data?.toString() || 'No allowance'}
              width="20em"
              mr="1em"
            />
            <Button onClick={approve}>Approve {symbol}</Button>
          </>
        ) : null}
      </Box>

      {accountCollateralData ? (
        <>
          <Box mt={10} p={1}>
            <Text>
              {symbol} address:{' '}
              <code
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(accountCollateralData.tokenAddress);
                  } catch (e) {}
                }}
                style={{ cursor: 'pointer' }}
              >
                {tokenAddress}
              </code>
            </Text>
            <Text>
              Wallet Balance: <Amount value={tokenBalance.data} /> {symbol}
            </Text>
            <Text>
              Deposited: <Amount value={accountCollateralData.totalDeposited} /> {symbol}
            </Text>
          </Box>
          <Box p={1} verticalAlign="middle">
            <Input type="number" step={1} min={0} name="deposit" width="20em" mr="1em" />
            <Button onClick={deposit}>Deposit</Button>
          </Box>

          <Box mt={10} p={1}>
            <Text>
              Delegated: <Amount value={accountCollateralData.totalAssigned} /> {symbol}
            </Text>
          </Box>
          <Box p={1} verticalAlign="middle">
            <Input type="number" step={1} min={0} name="delegate" width="20em" mr="1em" />
            <Button onClick={delegate}>Update delegated</Button>
          </Box>

          <Box mt={10} p={1}>
            <Text>
              Available collateral: <Amount value={accountCollateralData.availableCollateral} />{' '}
              {symbol}
            </Text>
          </Box>
          <Box p={1}>
            <Text
              title={
                accountCollateralUnlockDate.data
                  ? intlFormat(accountCollateralUnlockDate.data, {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })
                  : '~'
              }
            >
              Collateral unlocks: {timeToUnlock}
            </Text>
          </Box>

          <Box p={1} verticalAlign="middle">
            <Input
              type="number"
              step={1}
              min={0}
              max={parseFloat(accountCollateralData.availableCollateral?.toString() || '0')}
              name="withdraw"
              width="20em"
              mr="1em"
            />
            <Button onClick={withdraw}>Withdraw</Button>
          </Box>
        </>
      ) : null}
    </>
  );
}
