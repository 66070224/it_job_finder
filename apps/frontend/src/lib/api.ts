import { createApi } from "@repo/api-client";
import { cookies } from "next/headers";

export default async function getApi() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  return createApi(process.env.NEXT_PUBLIC_BACKEND_URL!, {
    Authorization: token ? `Bearer ${token}` : undefined,
  });
}
