import { DuneClient } from '@cowprotocol/ts-dune-client';
import { duneApiKey } from '../utils';

const client = new DuneClient(duneApiKey ?? 'yZsEUOdbTKMrlgm4bHS4ZUYzDtuK93SF');

export default client;
