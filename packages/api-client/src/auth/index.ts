import { createClient } from "../client.js";
import { ApiError } from "../error/api-error.js";
export interface Token {
  access_token: string;
}
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
  created_at: string;
  updated_at: string;
}

export function createAuthApi(client: ReturnType<typeof createClient>) {
  return {
    passwordSignup: (data: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    }) => client.post("/auths/password", data),

    passwordSignin: (data: {
      email: string;
      password: string;
    }): Promise<Token> => client.post("/auths/signin", data),

    googleSignin: () => client.redirect("/auths/google"),

    getSession: async (): Promise<User | null> => {
      try {
        const response = await client.get("/auths/session");
        return response;
      } catch (err) {
        console.log(err);
        if (err instanceof ApiError) {
          return null;
        } else {
          throw err;
        }
      }
    },
  };
}
