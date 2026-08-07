import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] min-h-screen">
      <div
        className="bg-secondary-foreground p-15 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)]
      bg-size-[40px_40px]"
      >
        <Logo className="text-primary-foreground" />
        <div className="mt-20 space-y-4">
          <h1 className="text-4xl font-medium text-primary-foreground">
            ลืมรหัสผ่าน<span className="font-bold">?</span> ไม่เป็นไร
            เดี๋ยวช่วยกู้คืนให้
          </h1>
          <p className="text-muted-foreground">ยืนยันตัวตนผ่านอีเมล</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-lg space-y-5">
          <div>
            <h1 className="text-4xl font-medium">ลืมรหัสผ่าน</h1>
            <p className="text-muted-foreground">
              กรอกอีเมลที่ใช้สมัคร เราจะส่งรหัสยืนยันไปให้
            </p>
          </div>
          <div className="flex mx-auto items-center gap-1.5 max-w-30 my-8">
            <div className="h-1 flex-1 bg-primary rounded-2xl" />
            <div className="h-1  flex-1 bg-gray-200 rounded-2xl" />
            <div className="h-1 flex-1 bg-gray-200 rounded-2xl" />
          </div>
          {/* forgot-password email form*/}
          <FieldGroup>
            <Field>
              <FieldLabel>อีเมล</FieldLabel>
              <Input
                className="p-5"
                type="email"
                placeholder="itjob@example.com"
              ></Input>
            </Field>
            <Button className="p-5" type="submit">ส่งรหัสยืนยัน</Button>
          </FieldGroup>

          <p className="text-center">
            นึกออกแล้ว?{" "}
            <Link
              href="/signin"
              className="underline underline-offset-1 text-primary"
            >
              กลับไปเข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
