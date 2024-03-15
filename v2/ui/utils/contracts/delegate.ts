// DelegateApprovals
import {
  name as DelegateApprovalsMainnet,
  address as DelegateApprovalsAddressMainnet,
  abi as DelegateApprovalsAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/DelegateApprovals';
import {
  name as DelegateApprovalsMainnetOvm,
  address as DelegateApprovalsAddressMainnetOvm,
  abi as DelegateApprovalsAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/DelegateApprovals';

export const contracts = {
  DelegateApprovals: {
    mainnet: {
      name: DelegateApprovalsMainnet,
      address: DelegateApprovalsAddressMainnet,
      abi: DelegateApprovalsAbiMainnet,
    },
    'mainnet-ovm': {
      name: DelegateApprovalsMainnetOvm,
      address: DelegateApprovalsAddressMainnetOvm,
      abi: DelegateApprovalsAbiMainnetOvm,
    },
  },
};
