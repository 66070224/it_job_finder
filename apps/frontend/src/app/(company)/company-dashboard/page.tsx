import { Button } from "@/components/ui/button";
import Cadidate from "./_components/cadidate";
import { ComDashCard } from "./_components/company-dashboard-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CompanyDashboardPage() {
  return (
    <>
      <div className="min-h-screen p-20 space-y-10">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Dashboard - Nexora Tech</h1>
          <Button className="p-5"><Link href="/create-job">+ ประกาศงานใหม่</Link></Button>
        </div>

        <div className="flex justify-around w-full gap-4">
          <ComDashCard text="ประกาศงานที่เปิดอยู่" count={5} />
          <ComDashCard text="ผู้สมัครทั้งหมด" count={327} />
        </div>

        <div>
          <Card className="container p-5 shadow-2xs">
            <CardHeader>
              <CardTitle className="font-sans text-muted-foreground font-normal">
                ผู้สมัครล่าสุด - Frontend Developer (React)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-medium space-y-3">
              <Cadidate name="พงศ์ณวิชญ์ งามสวนพลู" exp={3} match_score={85} />
              <Cadidate name="พงศ์ณวิชญ์ งามสวนพลู" exp={2} match_score={60} />
              <Cadidate name="พงศ์ณวิชญ์ งามสวนพลู" exp={1} match_score={50} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
