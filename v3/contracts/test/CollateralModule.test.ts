import { ethers } from 'ethers';
import { bootstrap } from './bootstrap';
import assertBn from '@synthetixio/core-utils/utils/assertions/assert-bignumber';

describe('Staking', () => {
  const { signers, systems } = bootstrap();

  let owner: ethers.Signer;

  const depositAmount = ethers.utils.parseEther('1000');
  const accountId = 1;
  const poolId = 1;

  before('identify signers', async () => {
    [owner] = signers();
  });

  it('mint WETH', async () => {
    await systems().WETH.connect(owner).deposit({ value: depositAmount });

    assertBn.equal(
      await systems()
        .WETH.connect(owner)
        .balanceOf(await owner.getAddress()),
      depositAmount
    );
  });

  it('mint SNX', async () => {
    await systems()
      .Core.connect(owner)
      .mintInitialSystemToken(await owner.getAddress(), depositAmount);

    assertBn.equal(
      await systems()
        .SNX.connect(owner)
        .balanceOf(await owner.getAddress()),
      depositAmount
    );
  });

  it('add SNX as collateral', async () => {
    await systems()
      .Core.connect(owner)
      .configureCollateral(
        systems().SNX.address,
        systems().aggregator.address,
        '5000000000000000000',
        '1500000000000000000',
        '20000000000000000000',
        true
      );
  });

  it('add WETH as collateral', async () => {
    await systems()
      .Core.connect(owner)
      .configureCollateral(
        systems().WETH.address,
        systems().aggregator.address,
        '5000000000000000000',
        '1500000000000000000',
        '20000000000000000000',
        true
      );
  });

  it('initial setup', async () => {
    await systems().Core.connect(owner).createAccount(accountId);
  });

  it('Stake SNX', async () => {
    // approve
    await systems().SNX.connect(owner).approve(systems().Core.address, depositAmount.mul(10));

    await systems()
      .Core.connect(owner)
      .depositCollateral(accountId, systems().SNX.address, depositAmount);

    // invest in the pool
    await systems()
      .Core.connect(owner)
      .delegateCollateral(
        accountId,
        poolId,
        systems().SNX.address,
        depositAmount,
        ethers.utils.parseEther('1')
      );
  });

  it('Check SNX staking position', async () => {
    assertBn.equal(
      (
        await systems()
          .Core.connect(owner)
          .getPositionCollateral(accountId, poolId, systems().SNX.address)
      ).amount,
      depositAmount
    );
  });

  it('Stake WETH', async () => {
    // approve
    await systems().WETH.connect(owner).approve(systems().Core.address, depositAmount.mul(10));

    await systems()
      .Core.connect(owner)
      .depositCollateral(accountId, systems().WETH.address, depositAmount);

    // invest in the pool
    await systems()
      .Core.connect(owner)
      .delegateCollateral(
        accountId,
        poolId,
        systems().WETH.address,
        depositAmount,
        ethers.utils.parseEther('1')
      );
  });

  it('Check WETH staking position', async () => {
    assertBn.equal(
      (
        await systems()
          .Core.connect(owner)
          .getPositionCollateral(accountId, poolId, systems().WETH.address)
      ).amount,
      depositAmount
    );
  });
});
