"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface UserProps {
  email: string;
  sub: string;
}

export async function getUser() {
  const cookie = await cookies();
  const token = cookie.get("auth_token");
  if (token === undefined || token.value === "") return null;
  try {
    const user: UserProps = jwtDecode(token.value);
    return user;
  } catch (error) {
    return null;
  }
}

export async function signOut() {
  const cookie = await cookies();
  cookie.delete("auth_token");
}
