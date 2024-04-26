export interface APIResponse<T> {
  status: number;
  message: string;
  code: string;
  data: T;
}
