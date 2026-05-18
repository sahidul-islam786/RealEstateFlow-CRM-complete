import { cn, getInitials } from "@/lib/utils";

interface AgentAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showStatus?: boolean;
  status?: "online" | "offline";
}

const sizeClasses = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
};

export function AgentAvatar({ name, size = "md", className, showStatus, status }: AgentAvatarProps) {
  const initials = getInitials(name);
  
  return (
    <div className="relative inline-flex">
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-primary/10 font-semibold text-primary",
          sizeClasses[size],
          className
        )}
      >
        {initials}
      </div>
      {showStatus && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card",
            status === "online" ? "bg-emerald-500" : "bg-red-500"
          )}
        />
      )}
    </div>
  );
}
