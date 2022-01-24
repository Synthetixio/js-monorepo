import { useQuery } from 'react-query';
import { BigNumber, ethers } from 'ethers';
import Connector from 'containers/Connector';
import { wei } from '@synthetixio/wei';

const ONE_YEAR_SECONDS = 365 * 24 * 3600;
const GELATO_POOL_ADDRESS = '0x83bEeFB4cA39af649D03969B442c0E9F4E1732D8'; // WETH/SNX
const GELATO_POOL_ABI = [
	{
		inputs: [],
		name: 'getUnderlyingBalances',
		outputs: [
			{ internalType: 'uint256', name: 'amount0Current', type: 'uint256' },
			{ internalType: 'uint256', name: 'amount1Current', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'totalSupply',
		outputs: [
			{
				name: '',
				type: 'uint256',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
];

type StakingRewardsData = {
	apy: number;
	snx: number;
	eth: number;
};

type CoinGeckoSnxRates = { havven: { usd: number }; ethereum: { usd: number } };
const getCoinGeckoSnxRates = async (): Promise<CoinGeckoSnxRates> => {
	const resp = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=havven%2Cethereum&vs_currencies=usd'
	);
	return resp.json();
};
export const useGetUniswapStakingRewardsAPY = ({
	stakingRewardsContract,
	tokenContract,
}: {
	stakingRewardsContract: ethers.Contract | null;
	tokenContract: ethers.Contract | null;
}) => {
	const { provider, network } = Connector.useContainer();
	return useQuery<StakingRewardsData | null>(
		[
			'uniswapStakingRewardsAPY',
			stakingRewardsContract?.address,
			tokenContract?.address,
			network?.id,
		],
		async () => {
			try {
				if (provider) {
					const GelatoPoolContract = new ethers.Contract(
						GELATO_POOL_ADDRESS,
						GELATO_POOL_ABI,
						provider
					);
					const [
						balances,
						gUNITotalSupply,
						ratesResults,
						rewardForDuration,
						duration,
						contractBalance,
					]: [
						{ amount0Current: BigNumber; amount1Current: BigNumber },
						BigNumber,
						CoinGeckoSnxRates,
						BigNumber,
						BigNumber,
						BigNumber
					] = await Promise.all([
						GelatoPoolContract.getUnderlyingBalances(),
						GelatoPoolContract.totalSupply(),
						getCoinGeckoSnxRates(),
						stakingRewardsContract?.connect(provider).getRewardForDuration() ??
							Promise.resolve(BigNumber.from(0)),
						stakingRewardsContract?.connect(provider).rewardsDuration() ??
							Promise.resolve(BigNumber.from(0)),
						tokenContract?.connect(provider).balanceOf(stakingRewardsContract?.address) ??
							Promise.resolve(BigNumber.from(0)),
					]);
					const {
						havven: { usd: snxRate },
						ethereum: { usd: ethRate },
					} = ratesResults;
					const { amount0Current, amount1Current } = balances;
					const amount0CurrentWei = wei(amount0Current);
					const amount1CurrentWei = wei(amount1Current);
					const totalValueInPool = amount0CurrentWei
						.mul(ethRate)
						.add(amount1CurrentWei.mul(snxRate));

					const gUNIPrice = wei(totalValueInPool).div(wei(gUNITotalSupply));
					const yearProRata = wei(ONE_YEAR_SECONDS).div(wei(duration));
					const gUNIValueInContract = wei(contractBalance).mul(gUNIPrice);
					const rewardsValuePerYear = wei(rewardForDuration).mul(yearProRata).mul(snxRate);

					return {
						eth: amount0CurrentWei.toNumber(),
						snx: amount1CurrentWei.toNumber(),
						apy: wei(100).mul(rewardsValuePerYear).div(gUNIValueInContract).toNumber(),
					};
				}
				return {
					eth: 0,
					snx: 0,
					apy: 0,
				};
			} catch (e) {
				console.error(e);
				return {
					eth: 0,
					snx: 0,
					apy: 0,
				};
			}
		},
		{
			enabled: !!stakingRewardsContract && !!network && !!network.id && !!tokenContract,
			refetchIntervalInBackground: false,
			refetchInterval: false,
		}
	);
};
