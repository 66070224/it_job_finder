import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <>
      {/* section หลัก */}
      <section
        className="flex grid-cols-2 items-center justify-around p-20
        bg-radial-[600px_300px_at_80%_-10%] from-sky-100 to-white"
      >
        {/* ด้านซ้าย */}
        <div className="max-w-md leading-relaxed space-y-6">
          <h1 className="text-4xl font-medium">
            แพลตฟอร์มหางานสาย IT ที่ออกแบบมาเพื่อคุณ
            <span className="text-primary"> พร้อมกับผู้ช่วย AI </span>
          </h1>
          <p className="text-muted-foreground">
            ค้นหางาน สร้างโปรไฟล์ ติดต่อบริษัท และรับคำแนะนำในการพัฒนาทักษะสำหรับสายงาน IT
          </p>

          {/* searchbar -> components later */}
          <div className="relative">
            <Input
              className="p-6 inset-shadow-2xs bg-white"
              placeholder="ค้นหา เช่น Frontend Developer"
            />
            <Button className="absolute p-5 right-1 top-1/2 -translate-y-1/2">
              ค้นหางาน
            </Button>
          </div>
        </div>

        {/* ด้านขวา */}
        <div className="max-w-xl">asdasd</div>
      </section>

      {/* section แพลตฟอร์มเราทำอะไรได้บ้าง */}
      <section className="flex flex-col items-center justify-center p-20 bg-neutral-50 space-y-7">
        <div className="container space-y-7 px-20">
          <div className="container leading-relaxed text-center">
            <h1 className="text-2xl font-medium">
              แพลตฟอร์มที่ออกแบบมาเพื่อสาย IT โดยเฉพาะ
            </h1>
            <p className="text-muted-foreground">
              ครบทุกฟังก์ชันตั้งแต่หา ถึงติดต่อ และปิดดีลงาน
            </p>
          </div>
          <div className="flex justify-around w-full gap-5">
            <Card className="container p-6">
              <CardHeader>
                <CardTitle className="font-bold">Smart Profile</CardTitle>
                <CardDescription>
                  นำเข้าข้อมูลจาก Resume เพื่อสร้างโปรไฟล์และลดเวลาการกรอกข้อมูล
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="container p-6">
              <CardHeader>
                <CardTitle className="font-bold">AI Career Roadmap</CardTitle>
                <CardDescription>
                  รับคำแนะนำในการพัฒนาทักษะและวางแผนการเรียนรู้ให้เหมาะกับสายงานที่สนใจ
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="container p-6">
              <CardHeader>
                <CardTitle className="font-bold">Real-Time Chat</CardTitle>
                <CardDescription>
                  พูดคุยกับบริษัท นัดสัมภาษณ์ และติดตามการสมัครงานได้แบบเรียลไทม์
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* section บริษัททำอะไรได้บ้าง */}
      <section className="flex flex-col items-center justify-center p-20 bg-sky-50 space-y-7">
        <div className="container space-y-7 px-20">
          <div className="container leading-relaxed text-center">
            <h1 className="text-2xl font-medium">
              สำหรับบริษัท: กรองผู้สมัครได้เร็วขึ้น
            </h1>
            <p className="text-muted-foreground">
              โพสต์งาน ค้นหาผู้สมัคร และติดตามการรับสมัครในที่เดียว
            </p>
          </div>
          <div className="flex justify-around w-full gap-5">
            <Card className="container p-6">
              <CardHeader>
                <CardTitle className="font-bold">Job Posting</CardTitle>
                <CardDescription>
                  สร้างประกาศงานและเข้าถึงผู้สมัครสาย IT ได้อย่างรวดเร็ว
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="container p-6">
              <CardHeader>
                <CardTitle className="font-bold">Candidate Screening</CardTitle>
                <CardDescription>
                  เปรียบเทียบทักษะ ประสบการณ์ และความเหมาะสมของผู้สมัคร
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="container p-6">
              <CardHeader>
                <CardTitle className="font-bold">Applicant Managing</CardTitle>
                <CardDescription>
                  จัดการผู้สมัครและอัปเดตสถานะการสมัครได้อย่างสะดวก
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* section แพ็กเกจ */}
      <section className="flex flex-col items-center justify-center p-20 bg-neutral-50">
        <div className="container space-y-7 px-30">
          <div className="leading-relaxed text-center">
            <h1 className="text-2xl font-medium">แพ็กเกจที่ใช่</h1>
            <p className="text-muted-foreground">
              เริ่มต้นใช้งานฟรี อัปเกรดเมื่อพร้อม
            </p>
          </div>
          <div className="flex container gap-5">
            <Card className="container p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-sans">
                  สำหรับเริ่มต้น
                </CardTitle>
                <CardDescription>
                  อัปโหลดเรซูเม่ ระบบแปลงเป็นโปรไฟล์ให้อัตโนมัติ
                  ลดเวลาการกรอกข้อมูล
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="container p-6 bg-secondary-foreground">
              <CardHeader>
                <CardTitle className="text-2xl font-sans text-white">
                  สำหรับมืออาชีพ
                </CardTitle>
                <CardDescription>
                  แชทกับ AI เพื่อวางแผนสายอาชีพ แนะนำสกิลที่ยังขาดอยู่ให้คุณ
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <footer className="text-sm text-muted-foreground bg-secondary-foreground p-3">
        <p>2026 ITJob - Job platform for IT professionals</p>
      </footer>
    </>
  );
}
