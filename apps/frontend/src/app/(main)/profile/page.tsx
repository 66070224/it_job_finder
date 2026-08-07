import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { Tag } from "@/components/ui/tag";
import { Textarea } from "@/components/ui/textarea";
import { Dot, SquareStar } from "lucide-react";
import Link from "next/link";
import { GrGithub } from "react-icons/gr";

export default function ProfilePage() {
  const progress_value = 65;
  return (
    <>
      <div className="flex flex-col w-full max-w-screen-2xl mx-auto justify-center p-20">
        <header className="mb-8">
          <h1 className="text-4xl font-medium">โปรไฟล์ของฉัน</h1>
          <p className="text-muted-foreground">
            ข้อมูลนี้จะแสดงให้บริษัทเห็นเมื่อคุณสมัครงาน
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]  gap-5 items-start">
          {/* ด้านซ้าย */}
          <div className="space-y-5">
            {/* ข้อมูลส่วนตัว */}
            <Card className="p-0">
              <CardHeader className="h-32 bg-linear-to-r from-secondary-foreground to-primary">
                <div className="relative px-8 pb-8">
                  <div className="mt-11 flex justify-between">
                    <div className="flex gap-6">
                      <div className="flex size-24 items-center justify-center rounded-2xl border-4 border-white shadow bg-blue-200">
                        IMAGE
                      </div>
                      <div className="pt-10">
                        <h1 className="text-3xl font-medium text-white">
                          อานุภาพ มงคลสุขทวี
                          <span className="ml-3 text-sm font-normal text-muted-foreground">
                            เกิด 31 กุมภาพันธ์ 2547
                          </span>
                        </h1>
                      </div>
                    </div>
                    <div className="pt-10">
                      <Button variant="outline">แก้ไขโปรไฟล์</Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="m-8 grid gap-4 md:grid-cols-2">
                  <div>ที่อยู่: กรุงเทพมหานคร, ประเทศไทย</div>
                  <div>อีเมล: 66070XXX@email.com</div>
                  <div className="flex items-center">
                    <GrGithub />: github.com/XXX
                  </div>
                  <div>เบอร์โทรศัพท์: 08X-XXX-XXXX</div>
                </div>
              </CardContent>
            </Card>

            {/* About Me */}
            <Card className="px-4 py-6">
              <CardHeader className="flex justify-between">
                <h1 className="text-xl">เกี่ยวกับฉัน</h1>
                <Link
                  href="/edit-aboutMe"
                  className="text-primary font-medium hover:underline"
                >
                  แก้ไข
                </Link>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="resize-none min-h-auto text-black"
                  value="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem error a doloribus incidunt dolores repudiandae ex
                deleniti qui eveniet dicta velit, adipisci magnam, autem
                cumque. Odio possimus vitae iure ipsum!
                "
                  disabled
                ></Textarea>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="px-4 py-6">
              <CardHeader className="flex justify-between">
                <h1 className="text-xl">ทักษะ</h1>
                <Link
                  href="/edit-skills"
                  className="text-primary font-medium hover:underline"
                >
                  แก้ไข
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-muted-foreground">ภาษาโปรแกรม</p>
                  <div className="flex gap-2">
                    <Tag text="JavaScript" />
                    <Tag text="JavaScript" />
                    <Tag text="JavaScript" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground font-medium">FRONTEND</p>
                  <div className="flex gap-2">
                    <Tag text="JavaScript" />
                    <Tag text="JavaScript" />
                    <Tag text="JavaScript" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground font-medium">BACKEND</p>
                  <div className="flex gap-2">
                    <Tag text="JavaScript" />
                    <Tag text="JavaScript" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground font-medium">DATABASE</p>
                  <div className="flex gap-2">
                    <Tag text="JavaScript" />
                    <Tag text="JavaScript" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground">ภาษาที่ใช้สื่อสาร</p>
                  <div className="flex gap-2">
                    <Tag text="JavaScript" />
                    <Tag text="JavaScript" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="px-4 py-6">
              <CardHeader className="flex justify-between">
                <h1 className="text-xl">การศึกษา</h1>
                <Link
                  href="/edit-skills"
                  className="text-primary font-medium hover:underline"
                >
                  +เพิ่มการศึกษา
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex">
                  <Dot color="var(--primary)" size={36} />
                  <div className="flex flex-col">
                    <p>คณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศ</p>
                    <p className="flex text-muted-foreground font-light">
                      สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
                      <Dot color="var(--muted-foreground)" size={16} /> 2566 -
                      2569
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Dot color="var(--primary)" size={36} />
                  <div className="flex flex-col">
                    <p className="">
                      คณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศ
                    </p>
                    <p className="flex text-muted-foreground font-light">
                      สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง{" "}
                      <Dot color="var(--muted-foreground)" size={16} /> 2566 -
                      2569
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="px-4 py-6">
              <CardHeader className="flex justify-between">
                <h1 className="text-xl">ประสบการณ์</h1>
                <Link
                  href="/edit-skills"
                  className="text-primary font-medium hover:underline"
                >
                  +เพิ่มประสบการณ์
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex">
                  <Dot color="var(--primary)" size={36} />
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <p>Frontend Developer - KMITL</p>
                      <p className="flex text-muted-foreground font-light">
                        มิถุนายน 2569 - ปัจจุบัน
                        <Dot color="var(--muted-foreground)" size={16} />{" "}
                        กรุงเทพมหานคร (Hybrid)
                      </p>
                    </div>
                    <p>
                      พัฒนา Web App ด้วย React/TypeScript ดูแล Design System
                      และร่วมออกแบบ UX กับทีมโปรดักต์
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Dot color="var(--primary)" size={36} />
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <p>Frontend Developer - KMITL</p>
                      <p className="flex text-muted-foreground font-light">
                        มิถุนายน 2569 - ปัจจุบัน
                        <Dot color="var(--muted-foreground)" size={16} />{" "}
                        กรุงเทพมหานคร (Hybrid)
                      </p>
                    </div>
                    <p>
                      พัฒนา Web App ด้วย React/TypeScript ดูแล Design System
                      และร่วมออกแบบ UX กับทีมโปรดักต์
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="px-4 py-6">
              <CardHeader className="flex justify-between">
                <h1 className="text-xl">ใบรับรอง</h1>
                <Link
                  href="/edit-skills"
                  className="text-primary font-medium hover:underline"
                >
                  +เพิ่มประสบการณ์
                </Link>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <SquareStar color="var(--primary)" size={24} />

                    <div className="flex flex-col">
                      <p className="font-medium">
                        AWS Certified Cloud Practitioner
                      </p>
                      <p className="text-muted-foreground font-light">
                        Amazon Web Services
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <SquareStar color="var(--primary)" size={24} />

                    <div className="flex flex-col">
                      <p className="font-medium">
                        AWS Certified Cloud Practitioner
                      </p>
                      <p className="text-muted-foreground font-light">
                        Amazon Web Services
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ด้านขวา */}
          {/* profile progress */}
          <div className="space-y-5">
            <Card className="p-9">
              <Progress value={progress_value}>
                <ProgressLabel>ความสมบูรณ์ของโปรไฟล์</ProgressLabel>
                <ProgressValue />
              </Progress>
            </Card>
            <Card className="p-6">
              <CardHeader><h1 className="text-xl font-medium">Resume</h1></CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
