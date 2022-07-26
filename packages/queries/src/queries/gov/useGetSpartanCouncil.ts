import { Contract, providers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';
import { Spartan } from '../../contracts';
import { getUsersDetails, UserDetail } from './utils';

const useGetSpartanCouncil = (
	_ctx: QueryContext,
	optimismProvider?: providers.BaseProvider,
	options?: UseQueryOptions<UserDetail[]>
) => {
	return useQuery<UserDetail[]>(
		['getSpartanCouncilMembers'],
		async () => {
			if (!optimismProvider) {
				throw Error('Expected optimismProvider to be defined');
			}
			const contract = new Contract(Spartan.address, Spartan.abi, optimismProvider);
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
export default useGetSpartanCouncil;
