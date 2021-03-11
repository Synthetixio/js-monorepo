import keyBy from 'lodash/keyBy';

import { TransactionEventCode } from './types';
export const TRANSACTION_EVENTS: TransactionEventCode[] = [
	'txSent',
	'txConfirmed',
	'txFailed',
	'txError',
];
export const TRANSACTION_EVENTS_MAP = keyBy(TRANSACTION_EVENTS);
