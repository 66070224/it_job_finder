import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Match } from "@/components/ui/match";

interface CadidateCardProps {
  name: string;
  exp: number;
  match_score: number;
}
export default function Cadidate({
  name,
  exp,
  match_score,
}: CadidateCardProps) {
  return (
    <Card className="hover:ring-1.5 hover:ring-blue-500/90 hover:shadow-xl p-6">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle className="font-sans">{name}</CardTitle>
          <CardDescription className="font-light">
            ประสบการณ์ {exp} ปี
          </CardDescription>
        </div>
        <CardContent className="flex justify-between">
          <Match match_score={match_score} />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
