"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { redirect } from "next/navigation";

export default function GoogleSignIn() {
  const googleSignin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL!}/auths/google`;
  };
  return (
    <Button
      onClick={googleSignin}
      className="py-5 cursor-pointer border-border w-full"
      variant="secondary"
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      เข้าสู่ระบบด้วย Google
    </Button>
  );
}
