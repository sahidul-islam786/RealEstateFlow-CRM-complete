import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "purple" | "teal" | "amber" | "red";
  className?: string;
  onClick?: () => void;
}

const variantClasses = {
  purple: "bg-primary/10 text-primary",
  teal: "bg-secondary/10 text-secondary",
  amber: "bg-warning/20 text-warning-foreground",
  red: "bg-destructive/10 text-destructive",
};

const iconBgClasses = {
  purple: "bg-primary/20",
  teal: "bg-secondary/20",
  amber: "bg-warning/30",
  red: "bg-destructive/20",
};

export function StatCard({ title, value, icon: Icon, variant = "purple", className, onClick }: StatCardProps) {
  const Component = onClick ? "button" : "div";
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl p-4",
        variantClasses[variant],
        onClick && "cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
    >
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconBgClasses[variant])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-xs opacity-80">{title}</span>
      </div>
    </Component>
  );
}
