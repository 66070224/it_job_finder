"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { redirect } from "next/navigation";

export default function GoogleSignIn() {
  const googleSignin = () => {
    redirect(`{process.env.BACKEND_URL}/auths/google`);
  };
  return (
    <form onSubmit={googleSignin}>
      <Button
        type="submit"
        className="py-5 cursor-pointer border-border w-full"
        variant="secondary"
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        เข้าสู่ระบบด้วย Google
      </Button>
    </form>
  );
}
