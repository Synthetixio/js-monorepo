import { ethers } from 'ethers';
import * as Synthetix from '@synthetixio/contracts/src/mainnet/deployment/Synthetix';

export async function mintSusd(amount = 1) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.CYPRESS_TENDERLY_RPC_URL);
  const wallet = process.env.CYPRESS_WALLET_ADDRESS;
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
