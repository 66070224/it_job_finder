import { BackButton } from "@/components/ui/backbutton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function JobDetailPage() {
  return (
    <div className="p-20 min-h-screen">
      <div className="mb-10">
        <BackButton />
      </div>

      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          {/*<Image className="w-14 h-14" src="" alt="logo"/>*/}
          <div>
            <h1 className="text-3xl font-bold">Frontend Developer (React)</h1>
            <p className="text-xl text-muted-foreground font-light">
              Nexora Tech - กรุงเทพฯ (Hybrid)
            </p>
          </div>
        </div>
        <Button className="p-6">สมัครงานนี้</Button>
      </header>

      <section className="grid grid-cols-[4fr_2fr] gap-5">
        <div className="space-y-4">
          <Card className="p-5">
            <CardHeader>
              <CardTitle className="font-sans font-medium text-xl">
                รายละเอียดงาน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 font-light">
                <li>พัฒนาและดูแล Web Application ด้วย React และ TypeScript</li>
                <li>ทำงานร่วมกับทีมออกแบบเพื่อสร้าง UI ที่ตอบสนองผู้ใช้</li>
                <li>เขียน Unit Test และดูแลคุณภาพโค้ด</li>
                <li>ร่วม Code Review กับทีมวิศวกร</li>
                <li>คุ้นเคยกับ REST API และ Git</li>
                <li>สื่อสารภาษาอังกฤษได้ในระดับพื้นฐาน</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="p-5">
            <CardHeader>
              <CardTitle className="font-sans font-medium text-xl">
                รายละเอียดงาน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 font-light">
                <li>พัฒนาและดูแล Web Application ด้วย React และ TypeScript</li>
                <li>ทำงานร่วมกับทีมออกแบบเพื่อสร้าง UI ที่ตอบสนองผู้ใช้</li>
                <li>เขียน Unit Test และดูแลคุณภาพโค้ด</li>
                <li>ร่วม Code Review กับทีมวิศวกร</li>
                <li>คุ้นเคยกับ REST API และ Git</li>
                <li>สื่อสารภาษาอังกฤษได้ในระดับพื้นฐาน</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="p-5">
            <CardHeader>
              <CardTitle className="font-sans font-medium text-xl">
                รายละเอียดงาน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 font-light">
                <li>พัฒนาและดูแล Web Application ด้วย React และ TypeScript</li>
                <li>ทำงานร่วมกับทีมออกแบบเพื่อสร้าง UI ที่ตอบสนองผู้ใช้</li>
                <li>เขียน Unit Test และดูแลคุณภาพโค้ด</li>
                <li>ร่วม Code Review กับทีมวิศวกร</li>
                <li>คุ้นเคยกับ REST API และ Git</li>
                <li>สื่อสารภาษาอังกฤษได้ในระดับพื้นฐาน</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card className="">
            <CardHeader>
              <CardTitle className="font-sans font-medium text-xl">
                ภาพรวมตำแหน่ง
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside space-y-3 font-light">
                <li className="flex justify-between">
                  <p className="text-muted-foreground">เงินเดือน</p>
                  ฿35,000–55,000
                </li>
                <div className="h-px flex-1 bg-border" />
                <li className="flex justify-between">
                  <p className="text-muted-foreground">ประเภทงาน</p>
                  Full-time
                </li>
                <div className="h-px flex-1 bg-border" />
                <li className="flex justify-between">
                  <p className="text-muted-foreground">รูปแบบ</p>
                  Hybrid
                </li>
                <div className="h-px flex-1 bg-border" />
                <li className="flex justify-between">
                  <p className="text-muted-foreground">ประสบการณ์</p>
                  1-3 ปี
                </li>
                <div className="h-px flex-1 bg-border" />
              </ul>
            </CardContent>
          </Card>
          <Card className="p-5 bg-secondary-foreground">
            <CardHeader>
              <CardTitle className="font-sans font-bold text-xl text-white">
                AI Match Score
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-4xl text-blue-400 text-shadow-2xs text-shadow-white/60">
                87%
              </p>
              <p className="text-muted-foreground font-light">
                โปรไฟล์ของคุณตรงกับตำแหน่งนี้ในระดับสูง
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
