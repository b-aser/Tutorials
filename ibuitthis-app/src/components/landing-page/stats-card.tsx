import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatsCard({
  icon: Icon,
  value,
  label,
  hasBorder,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  hasBorder?: boolean;
}) {
  return (
    <div className={cn("space-y-2", hasBorder && "border-x border-primary/50")}>
      <div className="flex items-center justify-center gap-2">
        <Icon className="size-5 text-primary/50" />
        <span className="text-3xl sm:text-4xl font-bold">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}
