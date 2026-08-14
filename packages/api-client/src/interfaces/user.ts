import Profile from "./profile.js";

export enum UserRole {
  JOB_SEEKER = "JOB_SEEKER",
  COMPANY = "COMPANY",
  ADMIN = "ADMIN",
}
export interface User {
  id: string;
  email: string;
  email_verified: boolean;
  avatar_url: string | null;
  first_name: string;
  last_name: string;
  role: UserRole | null;
  is_profile: boolean;
  profile: Profile | null;
  created_at: string;
  updated_at: string;
}
