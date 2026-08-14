"use server";

import { createApi } from "@repo/api-client";

export async function signout() {
  const api = await createApi();

  await api.auth.signout();
}
