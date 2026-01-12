export interface IApiResponse<T> {
  data: T;
  message: string;
  request: {
    method: string;
    url: string;
  };
  statusCode: number;
  success: boolean;
}
