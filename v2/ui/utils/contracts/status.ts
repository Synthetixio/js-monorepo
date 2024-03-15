// SystemStatus
import {
  name as SystemStatusMainnet,
  address as SystemStatusAddressMainnet,
  abi as SystemStatusAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SystemStatus';
import {
  name as SystemStatusMainnetOvm,
  address as SystemStatusAddressMainnetOvm,
  abi as SystemStatusAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SystemStatus';

// DappMaintenance
import {
  name as DappMaintenanceMainnet,
  address as DappMaintenanceAddressMainnet,
  abi as DappMaintenanceAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/DappMaintenance';
import {
  name as DappMaintenanceMainnetOvm,
  address as DappMaintenanceAddressMainnetOvm,
  abi as DappMaintenanceAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/DappMaintenance';

export const contracts = {
  SystemStatus: {
    mainnet: {
      name: SystemStatusMainnet,
      address: SystemStatusAddressMainnet,
      abi: SystemStatusAbiMainnet,
    },
    'mainnet-ovm': {
      name: SystemStatusMainnetOvm,
      address: SystemStatusAddressMainnetOvm,
      abi: SystemStatusAbiMainnetOvm,
    },
  },
  DappMaintenance: {
    mainnet: {
      name: DappMaintenanceMainnet,
      address: DappMaintenanceAddressMainnet,
      abi: DappMaintenanceAbiMainnet,
    },
    'mainnet-ovm': {
      name: DappMaintenanceMainnetOvm,
      address: DappMaintenanceAddressMainnetOvm,
      abi: DappMaintenanceAbiMainnetOvm,
    },
  },
};
