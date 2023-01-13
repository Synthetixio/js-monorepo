import { MultistepStatus } from './MultistepStatus';

export function statusColor(status: MultistepStatus): string {
  switch (true) {
    // order matters
    case status.failed:
      return 'red.700';
    case status.disabled:
      return 'gray.700';
    case status.loading:
      return 'gray.700';
    case status.success:
      return 'green.700';
    default:
      return 'gray.700';
  }
}
