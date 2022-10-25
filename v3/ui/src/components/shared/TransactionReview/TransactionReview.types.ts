export interface Transaction {
  title?: string;
  subtitle?: string;
  call?: () => void;
}

export enum StepStatus {
  Upcoming,
  Current,
  Completed,
  Error,
}
