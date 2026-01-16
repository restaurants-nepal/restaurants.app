import type { User } from "@/shared/models/user/user-model";

export interface LoginResponse {
  fullName: string;
  policies: [string];
  token: string;
  user: User;
  restaurantId: number;
}
