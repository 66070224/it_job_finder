import { cn } from "@/lib/utils";

interface Tagprops {
  text?: string;
  className?: string;
}
export function Tag({ text, className }: Tagprops) {
  return (
    <p
      className={cn(
        "text-xs text-primary p-1 bg-blue-300/40 rounded-2xl",
        className,
      )}
    >
      {"< "}
      {text}
      {" />"}
    </p>
  );
}
