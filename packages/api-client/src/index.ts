import { createAuthApi } from "./auth/index.js";
import { createClient } from "./client.js";

export function createApi(backendUrl: string) {
  const client = createClient(backendUrl);

  return {
    auth: createAuthApi(client),
  };
}
