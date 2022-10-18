import { ethers, providers, utils } from 'ethers';
import * as Synthetix from '@synthetixio/contracts/build/mainnet/deployment/Synthetix.js';

export async function mintsusd(envs) {
  const { TENDERLY_FORK_ID: forkId, TENDERLY_WALLET_ADDRESS: wallet } = envs;

  if (!forkId) {
    throw new Error('TENDERLY_FORK_ID is required');
  }
  if (!wallet) {
    throw new Error('TENDERLY_WALLET_ADDRESS is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${forkId}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);
  const signer = provider.getSigner(wallet);

  const SynthetixContract = new ethers.Contract(Synthetix.address, Synthetix.abi, signer);

  const debtPre = {
    sUSD: parseFloat(
      utils.formatUnits(
        await SynthetixContract.debtBalanceOf(wallet, utils.formatBytes32String('sUSD'))
      )
    ),
    collateral: parseFloat(utils.formatUnits(await SynthetixContract.collateral(wallet))),
    transferable: parseFloat(
      utils.formatUnits(await SynthetixContract.transferableSynthetix(wallet))
    ),
  };
  console.log({ debtPre });

  const mintTx = await SynthetixContract.issueSynths(
    utils.hexValue(utils.parseEther('10').toHexString())
  );
  console.log({ mintTx });

  const mintTxReceipt = await mintTx.wait();
  console.log({ mintTxReceipt });

  const debtPost = {
    sUSD: parseFloat(
      utils.formatUnits(
        await SynthetixContract.debtBalanceOf(wallet, utils.formatBytes32String('sUSD'))
      )
    ),
    collateral: parseFloat(utils.formatUnits(await SynthetixContract.collateral(wallet))),
    transferable: parseFloat(
      utils.formatUnits(await SynthetixContract.transferableSynthetix(wallet))
    ),
  };
  console.log({ debtPost });

  return {
    debtPre,
    debtPost,
    mintTx,
    mintTxReceipt,
  };
}
