export type DuneMeta = {
  column_names: string[]
  datapoint_count: number
  execution_time_millis: number
  pending_time_millis: number
  result_set_bytes: number
  total_row_count: number
}

export type DuneListResponse<T> = {
  metadata: DuneMeta
  rows: T[]
}
