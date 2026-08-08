import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const cookie = await cookies();
  const token = cookie.get("auth_token");
  if (token === undefined || token.value === "")
    return NextResponse.redirect(new URL("/signin", request.url));
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: "/profile",
};
