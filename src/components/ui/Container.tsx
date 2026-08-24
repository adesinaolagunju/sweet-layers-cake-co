import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = ComponentProps<"div">;

/**
 * Page-width wrapper. One place to control gutters and max width site-wide.
 */
export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props}>
      {children}
    </div>
  );
}
