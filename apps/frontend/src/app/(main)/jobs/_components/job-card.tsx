import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";

interface JobCardProps {
  header?: string;
  description?: string;
  skills?: string[];
  salary?: string;
  job_type?: string;
}
export default function JobCard({
  header,
  description,
  skills,
  salary,
  job_type,
}: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{header}</CardTitle>
        <CardDescription className="font-light">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        {skills?.map((skill) => (
          <Tag key={skill} text={skill} />
        ))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <p className="font-bold">฿{salary}</p>
        <Tag text={job_type} className="text-foreground bg-gray-300" />
      </CardFooter>
    </Card>
  );
}
