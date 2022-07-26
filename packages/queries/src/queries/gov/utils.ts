import { ethers } from 'ethers';
import { BOARDROOM_BATCH_USER_DETAILS_URL } from './constants';
import axios from 'axios';

const {
	providers: { JsonRpcProvider },
} = ethers;

export const getOVMProvider = () => {
	return new JsonRpcProvider('https://mainnet.optimism.io');
};

export type UserDetail = {
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

export const getUsersDetails = async (walletAddresses: string[]) => {
	const response = await axios.get<{ data: { users: UserDetail[] } }>(
		BOARDROOM_BATCH_USER_DETAILS_URL,
		{ params: { addressesList: walletAddresses.join(',') } }
	);
	return response.data.data.users;
};
