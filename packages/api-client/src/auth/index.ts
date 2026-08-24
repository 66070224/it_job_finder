import { cookies } from "next/headers.js";
import { createClient } from "../client.js";
import { ApiError } from "../error/api-error.js";
import { User } from "../interfaces/user.js";
export interface Token {
  access_token: string;
}

export function createAuthApi(client: ReturnType<typeof createClient>) {
  return {
    passwordSignup: (data: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    }) => client.post("/auths/password", data),

    passwordSignin: async (data: { email: string; password: string }) => {
      const response = await client.post("/auths/signin", data);
      const cookie = await cookies();
      cookie.set("access_token", response.access_token);
    },

    googleSignin: () => client.redirect("/auths/google"),

    getSession: async (profile = false): Promise<User | null> => {
      try {
        const response = await client.get(
          `/auths/session${profile === true ? "?profile=true" : ""}`,
        );
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

    signout: async () => {
      const cookie = await cookies();
      cookie.delete("access_token");
    },
  };
}
