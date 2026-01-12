import type { Roles } from "@/features/auth/models/role-model";

export interface User {
  id: number;
  email: string;
  role: Roles;
}
