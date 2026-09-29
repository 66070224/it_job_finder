import { cookies } from "next/headers.js";
import { redirect } from "next/navigation.js";

export async function createApi() {
  const backendUrl = process.env.BACKEND_URL!;

  const request = async (path: string, options?: RequestInit) => {
    const cookieStore = await cookies();
    return fetch(`${backendUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
        Cookie: cookieStore.toString(),
      },
    });
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
    signin: async (email: string, password: string) => {
      const response = await request("/auth/signin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        return { success: false, status: response.status };
      }
      const cookieStore = await cookies();
      const { access_token, refresh_token } = await response.json();
      cookieStore.set("access_token", access_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 60,
      });
      cookieStore.set("refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
      });
      return { success: true, status: response.status };
    },
    signout: async () => {
      const cookieStore = await cookies();
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");
    },
  };
}
