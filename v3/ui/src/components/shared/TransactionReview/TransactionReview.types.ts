export interface Transaction {
  title?: string;
  subtitle?: string;
  information?: string;
  call?: () => void;
}

export enum StepStatus {
  Upcoming,
  Current,
  Completed,
  Error,
}
