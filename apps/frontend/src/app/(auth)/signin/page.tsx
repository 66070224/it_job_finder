import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import SignInForm from "./_components/signin-form";

export default function SignInPage() {
  return (
    <div className="grid grid-cols-[2fr_3fr] min-h-screen">
      <div
        className="bg-secondary-foreground p-15 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)]
      bg-size-[40px_40px]"
      >
        <Logo className="text-primary-foreground" />
        <div className="mt-20 space-y-4">
          <h1 className="text-4xl font-medium text-primary-foreground">
            ยินดีต้อนรับกลับ
          </h1>
          <p className="text-muted-foreground">เข้าสู่ระบบเพื่อค้นหาโอกาสงานสาย IT ติดตามการสมัคร และรับคำแนะนำที่เหมาะกับคุณ</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg space-y-5">
          <div>
            <h1 className="text-4xl font-medium">เข้าสู่ระบบ</h1>
            <p className="text-muted-foreground">ยินดีต้อนรับกลับสู่ ITJob</p>
          </div>
          <SignInForm />
          <p className="text-center">
            ยังไม่มีบัญชี?{" "}
            <Link
              href="/signup"
              className="underline underline-offset-1 text-primary"
            >
              สมัครสมาชิก
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
