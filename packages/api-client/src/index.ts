import { cookies } from "next/headers.js";
import { redirect } from "next/navigation.js";
import { User } from "./interfaces/user.js";

export async function createApi() {
  const backendUrl = process.env.BACKEND_URL!;

  const request = async ({
    path,
    options,
    searchParams,
  }: {
    path: string;
    options?: RequestInit;
    searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
  }) => {
    const url = new URL(`${backendUrl}${path}`);
    if (searchParams) {
      url.search = new URLSearchParams(searchParams).toString();
    }
    const cookieStore = await cookies();
    return fetch(url, {
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
    get: (
      path: string,
      searchParams?: ConstructorParameters<typeof URLSearchParams>[0],
    ) => request({ path, searchParams }),
    post: (path: string, body?: unknown) =>
      request({
        path,
        options: {
          method: "POST",
          body: body ? JSON.stringify(body) : undefined,
        },
      }),
    redirect: (path: string) => redirectTo(path),
    signin: async (email: string, password: string) => {
      const response = await request({
        path: "/auth/signin",
        options: {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
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
    getSession: async () => {
      const response = await request({ path: "/auth/session" });
      if (!response.ok) {
        return null;
      }
      const user: User | null = await response.json();
      return user;
    },
  };
}
