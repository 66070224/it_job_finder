import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className } : React.ComponentProps<"div">) {
  return (
    <Link className="flex items-center gap-2" href="/">
      <div className="rounded-xl bg-linear-to-br from-blue-500 via-blue-700 to-slate-900 px-3.5 py-2 ring ring-white/10">
        <h1 className="font-heading text-xl font-bold tracking-tight text-white">
          IT
        </h1>
      </div>
      <h1 className={cn("text-2xl font-heading font-bold", className)}>
        ITJob
      </h1>
    </Link>
  );
}
