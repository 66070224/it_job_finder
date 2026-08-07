import Link from "next/link";
import SignUpForm from "./_components/signup-form";
import { Logo } from "@/components/ui/logo";

export default function SignUpPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] min-h-screen">
      <div
        className="bg-secondary-foreground p-15 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)]
      bg-size-[40px_40px]"
      >
        <Logo className="text-primary-foreground" />
        <div className="mt-20 space-y-4">
          <h1 className="text-4xl font-medium text-primary-foreground">
            สร้างบัญชีใหม่
          </h1>
          <p className="text-muted-foreground">ไม่ว่าคุณจะเป็นผู้หางานหรือบริษัท ก็สามารถสมัครได้เลย</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-lg space-y-5">
          <div>
            <h1 className="text-4xl font-medium">สมัครสมาชิก</h1>
            <p className="text-muted-foreground">เลือกประเภทบัญชีของคุณ</p>
          </div>
          <SignUpForm />
          <p className="text-center">
            มีบัญชีอยู่แล้ว?{" "}
            <Link
              href="/signin"
              className="underline underline-offset-1 text-primary"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
