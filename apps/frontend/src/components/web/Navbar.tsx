import Link from "next/link";
import { Button } from "../ui/button";
import { Logo } from "../ui/logo";
import { getUser } from "@/lib/user";
import SignOutButton from "./SignoutButton";

export default async function Navbar() {
  const user = await getUser();
  return (
    <nav className="flex justify-center gap-5 py-5 border-b-2 px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between w-full max-w-screen-2xl">
        <Logo />
        <div className="flex gap-10 items-center">
          <Link href="/jobs">
            <button className="cursor-pointer">หางาน</button>
          </Link>
          <Link href="/about-us">
            <button className="cursor-pointer">เกี่ยวกับเรา</button>
          </Link>
          <Link href="/company-dashboard">
            <button className="cursor-pointer">บริษัท</button>
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          {user ? (<>
            <div>{user.email}</div>
            <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  className="border-border/20"
                  variant="secondary"
                  size="lg"
                >
                  เข้าสู่ระบบ
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="border-border/20" size="lg">
                  สมัครสมาชิก
                </Button>
              </Link>
            </>
          )}

          {/*<ThemeToggle />*/}
        </div>
      </div>
    </nav>
  );
}
