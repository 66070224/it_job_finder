import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ComDashProps {
  text?: string;
  count?: number;
}
export function ComDashCard({ text, count }: ComDashProps) {
  return (
    <Card className="container p-5 shadow-2xs">
      <CardHeader>
        <CardTitle className="font-sans text-muted-foreground font-normal">
          {text}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-4xl font-medium">{count}</CardContent>
    </Card>
  );
}
