import { LucideIcon } from "lucide-react";

export default function EmptyState(
    {
        message,
        icon: Icon,
    }: {
        message: string;
        icon?: LucideIcon;
    }
) {
  return (
    <div className="empty-state">
      {Icon && (<Icon className="size-12 text-muted-foreground/80 mx-auto mb-4" />)}
      <p className="text-muted-foreground text-lg text-center">{message}</p>
    </div>
  );
}