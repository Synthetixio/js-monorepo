export interface Transaction {
  title?: string;
  subtitle?: string;
  information?: string;
  call?: (checked?: boolean) => void;
  checkboxLabel?: string;
  checked?: boolean;
}

export enum StepStatus {
  Upcoming,
  Current,
  Completed,
  Error,
}
