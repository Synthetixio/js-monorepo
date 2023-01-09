import { TransactionStatus } from './TransactionStatus';

export function statusColor(status: TransactionStatus): string {
  switch (status) {
    case 'idle':
      return 'gray.700';
    case 'processing':
      return 'gray.700';
    case 'failed':
      return 'red.700';
    case 'completed':
      return 'green.700';
  }
}
