import axios from 'axios';
import { Contract } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';
import { Spartan } from '../../contracts';
import { BOARDROOM_BATCH_USER_DETAILS_URL } from './constants';

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

const getUsersDetails = async (walletAddresses: string[], boardroomApiKey: string) => {
  const url = new URL(BOARDROOM_BATCH_USER_DETAILS_URL);
  url.searchParams.set('key', boardroomApiKey);

  const response = await axios.get<{ data: { users: UserDetail[] } }>(url.toString(), {
    params: { addressesList: walletAddresses.join(',') },
  });
  return response.data.data.users;
};

const useGetSpartanCouncil = (
  _ctx: QueryContext,
  boardroomApiKey: string,
  optimismProvider?: BaseProvider,
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
      return getUsersDetails(councilMembers, boardroomApiKey);
    },
    {
      enabled: Boolean(optimismProvider),
      staleTime: 900000,
      ...options,
    }
  );
};
export default useGetSpartanCouncil;
