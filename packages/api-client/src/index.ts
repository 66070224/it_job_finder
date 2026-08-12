import { createAuthApi } from "./auth/index.js";
import { createClient } from "./client.js";

export async function createApi(
  backendUrl: string,
  auth?: {
    Authorization?: string;
  },
) {
  const client = createClient(backendUrl, auth);

  return {
    auth: createAuthApi(client),
  };
}
