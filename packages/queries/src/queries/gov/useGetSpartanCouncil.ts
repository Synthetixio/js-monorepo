import axios from 'axios';
import { Contract, providers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';
import { Spartan } from '../../contracts';
import { GET_USER_DETAILS_API_URL } from './constants';

type UserDetail = {
	address: string;
	email: string;
	ens: string;
	username: string;
	twitter: string;
	about: string;
	website: string;
	notificationPreferences: string;
	associatedAddresses: string;
	type: string;
	pfpUrl: string;
	pfpImageId: string;
	bannerThumbnailUrl: string;
	bannerImageId: string;
	pfpThumbnailUrl: string;
	bannerUrl: string;
	discord: string;
	delegationPitch: string;
	github: string;
	council?: string;
};

// Ideally we want to use Boardroom's batch API, but it's currently broken
// https://swagger.boardroom.info/#/user/getBatchUserDetails
const getUsersDetails = (walletAddresses: string[]) =>
	Promise.all(
		walletAddresses.map(async (address) => {
			const response = await axios.post<UserDetail>(GET_USER_DETAILS_API_URL(address));
			return response.data;
		})
	);

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
