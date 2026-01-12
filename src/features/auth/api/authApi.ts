import type { IApiResponse } from "@/shared/models/api/api-response";
import type { LoginModel } from "../models/login-model";
import type { LoginResponse } from "../models/login-response";

export const UserLogin = async (
  credentials: LoginModel,
): Promise<IApiResponse<LoginResponse>> => {
  return fetch("api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};
