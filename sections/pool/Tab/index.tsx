import useSynthetixQueries, { GasPrice } from '@synthetixio/queries';
import Button from 'components/Button';
import GasSelector from 'components/GasSelector';
import { BigNumber, utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexDivCentered } from 'styles/common';
import { DataRow, StyledInput } from '../../staking/components/common';
import { WETHSNXLPTokenContract } from 'constants/gelato';
import Connector from 'containers/Connector';

export interface PoolTabProps {
	action: 'add' | 'remove';
	balance: BigNumber;
	rewardsToClaim: BigNumber;
	allowanceAmount: BigNumber;
	stakedTokens: BigNumber;
	fetchBalances: () => void;
	stakingRewardsContractName: 'StakingRewardsSNXWETHUniswapV3'; // can add more string when we have support for more
}

export default function PoolTab({
	action,
	balance,
	rewardsToClaim,
	allowanceAmount,
	stakedTokens,
	fetchBalances,
	stakingRewardsContractName,
}: PoolTabProps) {
	const { t } = useTranslation();
	const { synthetixjs } = Connector.useContainer();

	const [gasPrice, setGasPrice] = useState<GasPrice | undefined>(undefined);
	const [gasPriceClaimRewards, setGasPriceClaimRewards] = useState<GasPrice | undefined>(undefined);
	const [gasPriceApprove, setGasPriceApprove] = useState<GasPrice | undefined>(undefined);
	const [needToApprove, setNeedToApprove] = useState(false);
	const [error, setError] = useState('');
	const [amountToSend, setAmountToSend] = useState('');
	const { useSynthetixTxn, useContractTxn } = useSynthetixQueries();
	const approveTxn = useContractTxn(
		WETHSNXLPTokenContract,
		'approve',
		[
			synthetixjs?.contracts[stakingRewardsContractName].address,
			utils.parseUnits(amountToSend ? amountToSend : '0', 18),
		],
		gasPriceApprove,
		{
			onSettled: () => {
				fetchBalances();
			},
			enabled: Boolean(synthetixjs),
		}
	);
	const txn = useSynthetixTxn(
		stakingRewardsContractName,
		action === 'add' ? 'stake' : 'withdraw',
		[utils.parseUnits(amountToSend ? amountToSend : '0', 18)],
		gasPrice,
		{
			enabled: utils.parseUnits(amountToSend ? amountToSend : '0', 18).gt(BigNumber.from(0)),
			onSettled: () => {
				fetchBalances();
				setAmountToSend('');
			},
		}
	);

	const claimRewardsTx = useSynthetixTxn(
		stakingRewardsContractName,
		'getReward',
		[],
		gasPriceClaimRewards,
		{
			enabled: true,
			onSettled: () => {
				fetchBalances();
			},
		}
	);

	const handleTxButton = () => {
		if (!error) {
			if (needToApprove) {
				approveTxn.mutate();
			} else {
				txn.mutate();
			}
		}
	};
	const allowanceAmountString = allowanceAmount.toString();
	useEffect(() => {
		if (amountToSend) {
			setError('');
			try {
				const allowanceAmountBigNumber = BigNumber.from(allowanceAmountString);
				setNeedToApprove(utils.parseUnits(amountToSend, 18).gt(allowanceAmountBigNumber));
			} catch (error) {
				setError('Number is too big');
			}
		}
	}, [amountToSend, allowanceAmountString]);

	return (
		<StyledPoolTabWrapper>
			<StyledInputWrapper>
				<StyledInput
					placeholder={utils.formatUnits(action === 'add' ? balance : stakedTokens, 18)}
					type="number"
					onChange={(e) => {
						setAmountToSend(e.target.value || '');
					}}
					value={amountToSend}
				/>
				<StyledMaxButton
					variant="secondary"
					size="sm"
					disabled={action === 'add' ? balance.lte(0) : stakedTokens.lte(0)}
					onClick={() => {
						setAmountToSend(utils.formatUnits(action === 'add' ? balance : stakedTokens, 18));
					}}
				>
					{t('pool.tab.max')}
				</StyledMaxButton>
			</StyledInputWrapper>
			<DataRow>
				<GasSelector
					gasLimitEstimate={needToApprove ? approveTxn.gasLimit : txn.gasLimit}
					onGasPriceChange={needToApprove ? setGasPriceApprove : setGasPrice}
					optimismLayerOneFee={
						needToApprove ? approveTxn.optimismLayerOneFee : txn.optimismLayerOneFee
					}
					altVersion
				/>
			</DataRow>
			{action === 'remove' ? (
				<Button
					variant="primary"
					size="lg"
					disabled={Number(amountToSend || 0) <= 0 || txn.isLoading || approveTxn.isLoading}
					onClick={handleTxButton}
				>
					{t(txn.isLoading ? 'pool.tab.unstaking' : 'pool.tab.unstake')}
				</Button>
			) : (
				<Button
					variant="primary"
					size="lg"
					onClick={handleTxButton}
					disabled={
						Number(amountToSend || '0') <= 0 || !!error || txn.isLoading || approveTxn.isLoading
					}
				>
					{!!error
						? error
						: needToApprove
						? t(approveTxn.isLoading ? 'pool.tab.approving' : 'pool.tab.approve')
						: t(txn.isLoading ? 'pool.tab.staking' : 'pool.tab.stake')}
				</Button>
			)}

			<StyledButtonWrapper>
				<span>
					{t('pool.tab.reward-balance', { rewards: utils.formatUnits(rewardsToClaim, 18) })}
				</span>
				<GasSelector
					gasLimitEstimate={claimRewardsTx.gasLimit}
					onGasPriceChange={setGasPriceClaimRewards}
					optimismLayerOneFee={claimRewardsTx.optimismLayerOneFee}
					altVersion
				/>
				<Button
					variant="primary"
					size="lg"
					disabled={utils.formatUnits(rewardsToClaim, 18) === '0.0' || claimRewardsTx.isLoading}
					onClick={() => claimRewardsTx.mutate()}
				>
					{t('pool.tab.claim')}
				</Button>
			</StyledButtonWrapper>
		</StyledPoolTabWrapper>
	);
}

const StyledPoolTabWrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 450px;
`;

const StyledButtonWrapper = styled.div`
	margin-top: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	> * {
		margin: 8px;
	}
`;

const StyledInputWrapper = styled(FlexDivCentered)`
	align-items: center;
`;

const StyledMaxButton = styled(Button)`
	margin-top: 16px;
`;
