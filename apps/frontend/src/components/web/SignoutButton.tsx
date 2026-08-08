"use client";

import { signOut } from "@/lib/user";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOut();
    router.refresh();
  };
  return (
    <form onSubmit={onSubmit}>
      <Button type="submit">SignOut</Button>
    </form>
  );
}
