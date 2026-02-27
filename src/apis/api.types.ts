export interface ApiResponse<T> {
  status: "success";
  data: T;
  message: string | null;
}

export interface ErrorResponse {
  status: "error";
  code: string;
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
}