import Link from "next/link";
import { Button } from "../ui/button";
import { Logo } from "../ui/logo";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between gap-5 py-5 border-1 px-4 md:px-6 lg:px-8">
      <Logo />
      <div className="flex gap-10 items-center">
        <Link href="/jobs">
          <button className="cursor-pointer">หางาน</button>
        </Link>
        <Link href="/aiassist">
          <button className="cursor-pointer">AI ผู้ช่วย</button>
        </Link>
        <Link href="/packages">
          <button className="cursor-pointer">แพ็กเกจ</button>
        </Link>
      </div>
      <div className="flex gap-5 items-center">
        <Link href="/signin">
          <Button className="border-border/20" variant="secondary" size="lg">
            เข้าสู่ระบบ
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="border-border/20" size="lg">
            สมัครสมาชิก
          </Button>
        </Link>
        {/*<ThemeToggle />*/}
      </div>
    </nav>
  );
}