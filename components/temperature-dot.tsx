import { cn, getTemperatureColor } from "@/lib/utils";

interface TemperatureDotProps {
  temperature: "Hot" | "Warm" | "Cold";
  showLabel?: boolean;
  className?: string;
}

export function TemperatureDot({ temperature, showLabel = false, className }: TemperatureDotProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span
        className={cn(
          "h-2.5 w-2.5 rounded-full",
          getTemperatureColor(temperature)
        )}
      />
      {showLabel && (
        <span className="text-xs text-muted-foreground">{temperature}</span>
      )}
    </span>
  );
}
