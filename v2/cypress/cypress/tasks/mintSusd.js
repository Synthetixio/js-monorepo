import { ethers } from 'ethers';
import * as Synthetix from '@synthetixio/contracts/src/mainnet/deployment/Synthetix';

export async function mintSusd(fork, amount = 1) {
  const rpc = `https://rpc.tenderly.co/fork/${fork.simulation_fork.id}`;
  const [[wallet]] = Object.entries(fork.simulation_fork.accounts);

  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const signer = provider.getSigner(wallet);

  const SynthetixContract = new ethers.Contract(Synthetix.address, Synthetix.abi, signer);
  const debt = parseFloat(
    ethers.utils.formatUnits(
      await SynthetixContract.debtBalanceOf(wallet, ethers.utils.formatBytes32String('sUSD'))
    )
  );
  console.log('mintSusd', { debt });
  if (debt < 1) {
    await new Promise((ok) => setTimeout(ok, 1000));
    const mintTx = await SynthetixContract.issueSynths(
      ethers.utils.hexValue(ethers.utils.parseEther(`${amount}`).toHexString()),
      { gasLimit: 100_000_000 }
    );
    const receipt = await mintTx.wait();
    console.log('mintSusd', { tx: receipt.transactionHash });
    console.log('mintSusd', { result: 'OK' });
  } else {
    console.log('mintSusd', { result: 'SKIP' });
  }

  return null;
}
