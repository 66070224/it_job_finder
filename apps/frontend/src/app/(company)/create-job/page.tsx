import { BulletTextArea } from "@/components/ui/bullet-textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";

export default function CreateJobPage() {
  const departments = [
    { label: "เลือกแผนก", value: null },
    { label: "Software Engineering", value: "engineering" },
    { label: "Data & AI", value: "data" },
    { label: "IT & Infrastructure", value: "it" },
    { label: "Cybersecurity", value: "cybersecurity" },
    { label: "Product", value: "product" },
    { label: "UI/UX & Design", value: "design" },
  ];

  const exp = [
    {
      label: "ประสบการณ์การทำงาน",
      value: null,
    },
    { label: "ไม่มีประสบการณ์", value: "none" },
    { label: "Junior (0-2 ปี)", value: "junior" },
    { label: "Mid-level (2-5 ปี)", value: "mid" },
    { label: "Senior (5+ ปี)", value: "senior" },
    { label: "Lead / Manager", value: "manager" },
  ];

  const jobTypes = [
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
    { label: "Freelance", value: "freelance" },
  ];
  const workTypes = [
    { label: "Onsite", value: "onsite" },
    { label: "Hybrid", value: "hybrid" },
    { label: "Remote", value: "remote" },
  ];
  return (
    <>
      <div className="min-h-screen p-20 mb-20 space-y-10">
        <div>
          <h1 className="text-4xl font-medium">สร้างประกาศงานใหม่</h1>
          <p className="text-muted-foreground">
            กรอกรายละเอียดตำแหน่งงาน คำอธิบายและทักษะที่ต้องการ
          </p>
        </div>
        <div className="space-y-10">
          {/* ข้อมูลตำแหน่งงาน */}
          <Card className="px-4 py-8 shadow-xs">
            <CardHeader>
              <CardTitle className="font-sans">ข้อมูลตำแหน่งงาน</CardTitle>
              <CardDescription className="text-xs">
                ข้อมูลพื้นฐานของตำแหน่งที่เปิดรับ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p>ชื่อตำแหน่งงาน</p>
                <Input placeholder="กรอกตำแหน่งงาน" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p>แผนก</p>
                  <Field>
                    <Select items={departments}>
                      <SelectTrigger className="py-4">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {departments.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </div>
              <div>
                <p>ประเภทงาน</p>
                <RadioGroup className="inline-flex gap-4">
                  {jobTypes.map((type) => (
                    <FieldLabel
                      htmlFor={type.value}
                      key={type.value}
                      className="rounded-full cursor-pointer text-muted-foreground has-data-checked:text-primary border has-data-checked:border-primary"
                    >
                      <RadioGroupItem
                        hidden
                        value={type.value}
                        id={type.value}
                      />

                      <span className="rounded-full px-3 py-2">
                        {type.label}
                      </span>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <p>รูปแบบการทำงาน</p>
                <RadioGroup className="inline-flex gap-4">
                  {workTypes.map((type) => (
                    <FieldLabel
                      htmlFor={type.value}
                      key={type.value}
                      className="rounded-full cursor-pointer text-muted-foreground has-data-checked:text-primary border has-data-checked:border-primary"
                    >
                      <RadioGroupItem
                        hidden
                        value={type.value}
                        id={type.value}
                      />

                      <span className="rounded-full px-3 py-2">
                        {type.label}
                      </span>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p>สถานที่ทำงาน</p>
                  <Input placeholder="เช่น กรุงเทพมหานคร" />
                </div>
                <div>
                  <p>จำนวนที่เปิดรับ</p>
                  <Input placeholder="กรอกจำนวนที่เปิดรับ" />
                </div>
              </div>
              <div>
                <p>ช่วงเงินเดือน</p>
                <div className="flex gap-3">
                  <Input placeholder="ต่ำสุด เช่น 35,000" />
                  <Input placeholder="สูงสุด เช่น 55,000" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* รายละเอียดงาน */}
          <Card className="px-4 py-8 shadow-xs">
            <CardHeader>
              <CardTitle className="font-sans">รายละเอียดงาน</CardTitle>
              <CardDescription className="text-xs">
                อธิบายลักษณะงานและความรับผิดชอบ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p>เกี่ยวกับตำแหน่งนี้</p>
                <BulletTextArea placeholder="เช่น รายละเอียดเกี่ยวกับตำแหน่งงาน..." />
              </div>
              <div>
                <p>ความรับผิดชอบหลัก</p>
                <BulletTextArea placeholder="เช่น พัฒนาเว็บไซต์, ดูแลฐานข้อมูล, ทำงานร่วมกับทีม..." />
              </div>
              <div>
                <p>สวัสดิการ</p>
                <BulletTextArea placeholder="เช่น ประกันสุขภาพ, Work From Home, งบพัฒนาทักษะ..." />
              </div>
            </CardContent>
          </Card>

          {/* คุณสมบัติกับประสบการณ์ */}
          <Card className="px-4 py-8 shadow-xs">
            <CardHeader>
              <CardTitle className="font-sans">
                คุณสมบัติและทักษะที่ต้องการ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p>ทักษะที่จำเป็น</p>
                <Input />
              </div>
              <div>
                <p>ประสบการณ์ขั้นต่ำ</p>
                <Field>
                  <Select items={exp}>
                    <SelectTrigger className="py-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {exp.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
