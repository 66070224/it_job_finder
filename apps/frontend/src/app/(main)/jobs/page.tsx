import { Tag } from "@/components/ui/tag";
import JobCard from "./_components/job-card";
import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="flex flex-col w-full max-w-screen-2xl mx-auto justify-center p-20">
      <header className="flex items-center justify-between mb-10">
        <h1 className="font-medium text-4xl">
          ตำแหน่งงาน <span className="font-bold">IT</span> ทั้งหมด
        </h1>
        <Tag text="3,200 ตำแหน่ง" />
      </header>
      <section className="flex flex-col gap-7">
        {Array.from({ length: 15 }).map((_, index) => (
          <Link href="/jobs/id" key={index}>
            <JobCard
              header="Frontend Developer (React)"
              description="Nexora Tech - กรุงเทพฯ (Hybrid) - ประสบการณ์ 1-3 ปี"
              skills={["React", "TypeScript"]}
              salary="35,000-55,000"
              job_type="Full-time"
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
