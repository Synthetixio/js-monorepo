// Synths

// Mainnet
import {
  name as SynthsAAVEMainnet,
  address as SynthsAAVEAddressMainnet,
  abi as SynthsAAVEAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsAAVE';

import {
  name as SynthsADAMainnet,
  address as SynthsADAAddressMainnet,
  abi as SynthsADAAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsADA';

import {
  name as SynthsAUDMainnet,
  address as SynthsAUDAddressMainnet,
  abi as SynthsAUDAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsAUD';

import {
  name as SynthsBTCMainnet,
  address as SynthsBTCAddressMainnet,
  abi as SynthsBTCAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsBTC';

import {
  name as SynthsCHFMainnet,
  address as SynthsCHFAddressMainnet,
  abi as SynthsCHFAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsCHF';

import {
  name as SynthsDOTMainnet,
  address as SynthsDOTAddressMainnet,
  abi as SynthsDOTAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsDOT';

import {
  name as SynthsETHMainnet,
  address as SynthsETHAddressMainnet,
  abi as SynthsETHAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsETH';

import {
  name as SynthsETHBTCMainnet,
  address as SynthsETHBTCAddressMainnet,
  abi as SynthsETHBTCAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsETHBTC';

import {
  name as SynthsEURMainnet,
  address as SynthsEURAddressMainnet,
  abi as SynthsEURAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsEUR';

import {
  name as SynthsGBPMainnet,
  address as SynthsGBPAddressMainnet,
  abi as SynthsGBPAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsGBP';

import {
  name as SynthsJPYMainnet,
  address as SynthsJPYAddressMainnet,
  abi as SynthsJPYAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsJPY';

import {
  name as SynthsKRWMainnet,
  address as SynthsKRWAddressMainnet,
  abi as SynthsKRWAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsKRW';

import {
  name as SynthsLinkMainnet,
  address as SynthsLinkAddressMainnet,
  abi as SynthsLinkAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsLINK';

import {
  name as SynthsUSDMainnet,
  address as SynthsUSDAddressMainnet,
  abi as SynthsUSDAbiMainnet,
} from '@synthetixio/contracts/build/mainnet/deployment/SynthsUSD';

// Mainnet OVM
import {
  name as SynthsAAVEMainnetOvm,
  address as SynthsAAVEAddressMainnetOvm,
  abi as SynthsAAVEAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthsAAVE';

import {
  name as SynthsAVAXMainnetOvm,
  address as SynthsAVAXAddressMainnetOvm,
  abi as SynthsAVAXAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthsAVAX';

import {
  name as SynthsBTCMainnetOvm,
  address as SynthsBTCAddressMainnetOvm,
  abi as SynthsBTCAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthsBTC';

import {
  name as SynthsMATICMainnetOvm,
  address as SynthsMATICAddressMainnetOvm,
  abi as SynthsMATICAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthsMATIC';

import {
  name as SynthsSOLMainnetOvm,
  address as SynthsSOLAddressMainnetOvm,
  abi as SynthsSOLAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthsSOL';

import {
  name as SynthsETHMainnetOvm,
  address as SynthsETHAddressMainnetOvm,
  abi as SynthsETHAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthsETH';

import {
  name as SynthsUNIMainnetOvm,
  address as SynthsUNIAddressMainnetOvm,
  abi as SynthsUNIAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthsUNI';

import {
  name as SynthsEURMainnetOvm,
  address as SynthsEURAddressMainnetOvm,
  abi as SynthsEURAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthsEUR';

import {
  name as SynthsLinkMainnetOvm,
  address as SynthsLinkAddressMainnetOvm,
  abi as SynthsLinkAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthsLINK';

import {
  name as SynthsUSDMainnetOvm,
  address as SynthsUSDAddressMainnetOvm,
  abi as SynthsUSDAbiMainnetOvm,
} from '@synthetixio/contracts/build/mainnet-ovm/deployment/SynthsUSD';

export const contracts = {
  SynthsAAVE: {
    mainnet: {
      name: SynthsAAVEMainnet,
      address: SynthsAAVEAddressMainnet,
      abi: SynthsAAVEAbiMainnet,
    },
    'mainnet-ovm': {
      name: SynthsAAVEMainnetOvm,
      address: SynthsAAVEAddressMainnetOvm,
      abi: SynthsAAVEAbiMainnetOvm,
    },
  },
  SynthsBTC: {
    mainnet: {
      name: SynthsBTCMainnet,
      address: SynthsBTCAddressMainnet,
      abi: SynthsBTCAbiMainnet,
    },
    'mainnet-ovm': {
      name: SynthsBTCMainnetOvm,
      address: SynthsBTCAddressMainnetOvm,
      abi: SynthsBTCAbiMainnetOvm,
    },
  },
  SynthsEUR: {
    mainnet: {
      name: SynthsEURMainnet,
      address: SynthsEURAddressMainnet,
      abi: SynthsEURAbiMainnet,
    },
    'mainnet-ovm': {
      name: SynthsEURMainnetOvm,
      address: SynthsEURAddressMainnetOvm,
      abi: SynthsEURAbiMainnetOvm,
    },
  },
  SynthsETH: {
    mainnet: {
      name: SynthsETHMainnet,
      address: SynthsETHAddressMainnet,
      abi: SynthsETHAbiMainnet,
    },
    'mainnet-ovm': {
      name: SynthsETHMainnetOvm,
      address: SynthsETHAddressMainnetOvm,
      abi: SynthsETHAbiMainnetOvm,
    },
  },
  SynthsUSD: {
    mainnet: {
      name: SynthsUSDMainnet,
      address: SynthsUSDAddressMainnet,
      abi: SynthsUSDAbiMainnet,
    },
    'mainnet-ovm': {
      name: SynthsUSDMainnetOvm,
      address: SynthsUSDAddressMainnetOvm,
      abi: SynthsUSDAbiMainnetOvm,
    },
  },
  SynthsAUD: {
    mainnet: {
      name: SynthsAUDMainnet,
      address: SynthsAUDAddressMainnet,
      abi: SynthsAUDAbiMainnet,
    },
  },
  SynthsADA: {
    mainnet: {
      name: SynthsADAMainnet,
      address: SynthsADAAddressMainnet,
      abi: SynthsADAAbiMainnet,
    },
  },
  SynthsCHF: {
    mainnet: {
      name: SynthsCHFMainnet,
      address: SynthsCHFAddressMainnet,
      abi: SynthsCHFAbiMainnet,
    },
  },
  SynthsDOT: {
    mainnet: {
      name: SynthsDOTMainnet,
      address: SynthsDOTAddressMainnet,
      abi: SynthsDOTAbiMainnet,
    },
  },
  SynthsETHBTC: {
    mainnet: {
      name: SynthsETHBTCMainnet,
      address: SynthsETHBTCAddressMainnet,
      abi: SynthsETHBTCAbiMainnet,
    },
  },
  SynthsJPY: {
    mainnet: {
      name: SynthsJPYMainnet,
      address: SynthsJPYAddressMainnet,
      abi: SynthsJPYAbiMainnet,
    },
  },
  SynthsGBP: {
    mainnet: {
      name: SynthsGBPMainnet,
      address: SynthsGBPAddressMainnet,
      abi: SynthsGBPAbiMainnet,
    },
  },
  SynthsKRW: {
    mainnet: {
      name: SynthsKRWMainnet,
      address: SynthsKRWAddressMainnet,
      abi: SynthsKRWAbiMainnet,
    },
  },
  SynthsLINK: {
    mainnet: {
      name: SynthsLinkMainnet,
      address: SynthsLinkAddressMainnet,
      abi: SynthsLinkAbiMainnet,
    },
    'mainnet-ovm': {
      name: SynthsLinkMainnetOvm,
      address: SynthsLinkAddressMainnetOvm,
      abi: SynthsLinkAbiMainnetOvm,
    },
  },
  SynthsSOL: {
    'mainnet-ovm': {
      name: SynthsSOLMainnetOvm,
      address: SynthsSOLAddressMainnetOvm,
      abi: SynthsSOLAbiMainnetOvm,
    },
  },
  SynthsMATIC: {
    'mainnet-ovm': {
      name: SynthsMATICMainnetOvm,
      address: SynthsMATICAddressMainnetOvm,
      abi: SynthsMATICAbiMainnetOvm,
    },
  },
  SynthsUNI: {
    'mainnet-ovm': {
      name: SynthsUNIMainnetOvm,
      address: SynthsUNIAddressMainnetOvm,
      abi: SynthsUNIAbiMainnetOvm,
    },
  },
  SynthsAVAX: {
    'mainnet-ovm': {
      name: SynthsAVAXMainnetOvm,
      address: SynthsAVAXAddressMainnetOvm,
      abi: SynthsAVAXAbiMainnetOvm,
    },
  },
};
