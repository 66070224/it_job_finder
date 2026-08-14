import { cookies } from "next/headers.js";
import { createClient } from "../client.js";
export interface Token {
  access_token: string;
}

export function createUserApi(client: ReturnType<typeof createClient>) {
  return {
    createProfile: (data: {
      phone: string;
      birth_date: Date;
      address: string;
      github_url: string | null;
    }) => client.post("/profiles", data),
  };
}
