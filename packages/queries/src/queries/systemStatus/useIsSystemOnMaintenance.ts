import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';

const IS_PROD = !!process.env.NEXT_PUBLIC_IS_PROD;

const useIsSystemOnMaintenance = (ctx: QueryContext, options?: UseQueryOptions<boolean>) => {
	return useQuery<boolean>(
		['systemStatus', 'isOnMaintenance', ctx.networkId],
		async () => {
			const [isSystemUpgrading, isExchangePaused] = (await Promise.all([
				ctx.snxjs.contracts.SystemStatus.isSystemUpgrading(),
				ctx.snxjs.contracts.DappMaintenance.isPausedSX(),
			])) as [boolean, boolean];

			return isSystemUpgrading || (isExchangePaused && IS_PROD);
		},
		{
			enabled: !!ctx.networkId,
			...options,
		}
	);
};

export default useIsSystemOnMaintenance;
