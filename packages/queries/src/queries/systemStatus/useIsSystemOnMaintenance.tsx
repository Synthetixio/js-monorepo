import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';

import QUERY_KEYS from '../../queryKeys';

const IS_PROD = !!process.env.NEXT_PUBLIC_IS_PROD;

const useIsSystemOnMaintenance = (ctx: QueryContext, options?: UseQueryOptions<boolean>) => {
	return useQuery<boolean>(
		QUERY_KEYS.SystemStatus.IsUpgrading,
		async () => {
			const [isSystemUpgrading, isExchangePaused] = (await Promise.all([
				ctx.snxjs.contracts.SystemStatus.isSystemUpgrading(),
				ctx.snxjs.contracts.DappMaintenance.isPausedSX(),
			])) as [boolean, boolean];

			return isSystemUpgrading || (isExchangePaused && IS_PROD);
		},
		{
			...options,
		}
	);
};

export default useIsSystemOnMaintenance;
