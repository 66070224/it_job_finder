import { cookies } from "next/headers.js";
import { createAuthApi } from "./auth/index.js";
import { createClient } from "./client.js";
import { createUserApi } from "./user/index.js";

export async function createApi() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const client = createClient(process.env.NEXT_PUBLIC_BACKEND_URL!, {
    Authorization: token ? `Bearer ${token}` : undefined,
  });

  return {
    auth: createAuthApi(client),
    user: createUserApi(client),
  };
}
