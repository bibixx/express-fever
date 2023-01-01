interface ErrorBaseResponse {
  api_version: number;
  auth: 0;
}

interface SuccessfulBaseResponse {
  api_version: number;
  auth: 1;
  last_refreshed_on_time: number;
}

export type BaseResponse = ErrorBaseResponse | SuccessfulBaseResponse;
