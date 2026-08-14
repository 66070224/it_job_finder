import { ApiError } from "./error/api-error.js";
import { redirect } from "next/navigation.js";

export function createClient(
  backendUrl: string,
  auth?: {
    Authorization?: string;
  },
) {
  const request = async (path: string, options?: RequestInit) => {
    console.log(`${backendUrl}${path}`);
    const response = await fetch(`${backendUrl}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...auth,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new ApiError(response.status, body?.message, body?.error);
    }

    return response.json();
  };

  const redirectTo = (path: string) => redirect(`${backendUrl}${path}`);

  return {
    get: (path: string) => request(path),
    post: (path: string, body?: unknown) =>
      request(path, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      }),
    redirect: (path: string) => redirectTo(path),
  };
}
