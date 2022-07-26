import { Contract, providers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';
import { Grants } from '../../contracts';
import { getUsersDetails, UserDetail } from './utils';

const useGetGrantsCouncil = (
	_ctx: QueryContext,
	optimismProvider?: providers.BaseProvider,
	options?: UseQueryOptions<UserDetail[]>
) => {
	return useQuery<UserDetail[]>(
		['getGrantsCouncilMembers'],
		async () => {
			if (!optimismProvider) {
				throw Error('Expected optimismProvider to be defined');
			}
			const contract = new Contract(Grants.address, Grants.abi, optimismProvider);
			const councilMembers: string[] = await contract.getCouncilMembers();
			return getUsersDetails(councilMembers);
		},
		{
			enabled: Boolean(optimismProvider),
			staleTime: 900000,
			...options,
		}
	);
};
export default useGetGrantsCouncil;
