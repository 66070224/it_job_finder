import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import JobCard from "./_components/job-card";

export default function JobsPage() {
  return (
    <div className="p-20">
      <header className="flex items-center justify-between mb-10">
        <h1 className="font-medium text-4xl">
          ตำแหน่งงาน <span className="font-bold">IT</span> ทั้งหมด
        </h1>
        <Tag text="3,200 ตำแหน่ง" />
      </header>
      <section className="flex flex-col gap-7">
        <Card>
          <CardHeader>
            <CardTitle>Frontend Developer (React)</CardTitle>
            <CardDescription className="font-light">
              Nexora Tech - กรุงเทพฯ (Hybrid) - ประสบการณ์ 1-3 ปี
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Tag text="React" />
            <Tag text="TypeScript" />
            <Tag text="Tailwind" />
          </CardContent>
          <CardFooter className="flex gap-2">
            <p className="font-bold">฿35,000-55,000</p>
            <Tag text="Full-time" className="text-foreground bg-gray-300" />
          </CardFooter>
        </Card>
        <JobCard
          header="Frontend Developer (React)"
          description="Nexora Tech - กรุงเทพฯ (Hybrid) - ประสบการณ์ 1-3 ปี"
          skills={["React", "TypeScript"]}
          salary="35,000-55,000"
          job_type="Full-time"
        />
        <JobCard
          header="Frontend Developer (React)"
          description="Nexora Tech - กรุงเทพฯ (Hybrid) - ประสบการณ์ 1-3 ปี"
          skills={["React", "TypeScript"]}
          salary="35,000-55,000"
          job_type="Full-time"
        />
      </section>
    </div>
  );
}
