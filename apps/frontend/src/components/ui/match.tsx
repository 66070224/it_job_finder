interface MatchProps {
  match_score: number;
}
export function Match({ match_score }: MatchProps) {
  const color =
    match_score >= 80
      ? "bg-emerald-500"
      : match_score >= 60
        ? "bg-amber-500"
        : "bg-rose-500";
  return (
    <div
      className={`${color} w-15 h-15 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg ring-1 ring-white transition-all duration-200 hover:scale-105`}
    >
      <p className="font-bold">{match_score}%</p>
    </div>
  );
}
