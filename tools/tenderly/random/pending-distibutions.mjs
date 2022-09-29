#!/usr/bin/env node

import { ethers, providers, utils } from 'ethers';
import * as RewardsDistribution from '@synthetixio/contracts/build/mainnet/deployment/RewardsDistribution.js';
import * as ProxyERC20 from '@synthetixio/contracts/build/mainnet/deployment/ProxyERC20.js';
import * as Synthetix from '@synthetixio/contracts/build/mainnet/deployment/Synthetix.js';
import { env } from './lib/env.mjs';
import { fork } from './lib/fork.mjs';

async function run(envs) {
  const { TENDERLY_FORK_ID } = envs;
  if (!TENDERLY_FORK_ID) {
    throw new Error('TENDERLY_FORK_ID is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);
  const RewardsDistributionContract = new ethers.Contract(
    RewardsDistribution.address,
    RewardsDistribution.abi,
    provider
  );
  const ProxyERC20Contract = new ethers.Contract(ProxyERC20.address, ProxyERC20.abi, provider);
  const SynthetixContract = new ethers.Contract(Synthetix.address, Synthetix.abi, provider);

  const owner = await RewardsDistributionContract.owner();
  console.log({ 'RewardsDistribution.owner': owner });

  const distributionsLength = await RewardsDistributionContract.distributionsLength();
  console.log({ distributionsLength: distributionsLength.toNumber() });

  const synthetixOwner = await SynthetixContract.owner();
  console.log({ 'SynthetixContract.owner': synthetixOwner });

  const distributions = await Promise.all(
    new Array(distributionsLength.toNumber()).fill(0).map(async (_, i) => {
      const distribution = await RewardsDistributionContract.distributions(i);
      return {
        destination: distribution.destination,
        amount: utils.formatUnits(distribution.amount),
      };
    })
  );
  console.log({ distributions });

  const distributionAddresses = Array.from(
    distributions.reduce((result, { destination }) => result.add(destination), new Set())
  );
  const balances = Object.fromEntries(
    await Promise.all(
      distributionAddresses.map(async (address) => [
        address,
        utils.formatUnits(await ProxyERC20Contract.balanceOf(address)),
      ])
    )
  );
  console.log({ balances });
}

Promise.resolve()
  .then(env)
  .then(async (envs) => {
    // augment with CLI arguments
    const { TENDERLY_FORK_ID } = envs;
    const forkId = TENDERLY_FORK_ID ? TENDERLY_FORK_ID : (await fork(envs))?.simulation_fork?.id;

    return {
      TENDERLY_FORK_ID: forkId,
    };
  })
  .then(run)
  .catch(console.error);
