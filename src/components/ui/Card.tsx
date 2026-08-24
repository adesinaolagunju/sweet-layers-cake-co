import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"div"> & {
  /** Adds a gentle hover lift for clickable/promotional cards. */
  interactive?: boolean;
};

export function Card({ interactive = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-espresso-900/5",
        interactive && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
