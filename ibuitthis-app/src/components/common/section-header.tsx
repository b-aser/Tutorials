import { LucideIcon } from "lucide-react";

export default function SectionHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="">
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Icon className="size-6 text-primary" />
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
    </div>
  );
}
