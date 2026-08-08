import { createClient } from "../client.js";

export function createAuthApi(client: ReturnType<typeof createClient>) {
  return {
    passwordSignup: (data: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    }) => client.post("/auths/password", data),

    passwordSignin: (data: { email: string; password: string }) =>
      client.post("/auths/signin", data),

    googleSignin: () => client.redirect("/auths/google"),
  };
}
