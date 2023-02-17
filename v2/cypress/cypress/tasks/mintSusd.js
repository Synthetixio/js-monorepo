import { ethers } from 'ethers';
import * as Synthetix from '@synthetixio/contracts/src/mainnet/deployment/Synthetix';

export async function mintSusd(amount = 1) {
  const wallet = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
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
      ethers.utils.hexValue(ethers.utils.parseEther(`${amount}`).toHexString())
    );
    const receipt = await mintTx.wait();
    console.log('mintSusd', { tx: receipt.transactionHash });
    console.log('mintSusd', { result: 'OK' });
  } else {
    console.log('mintSusd', { result: 'SKIP' });
  }

  return null;
}
