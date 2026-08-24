import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small uppercase kicker above the title (sans-serif, not script). */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Anchor id so nav links can scroll to this section. */
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="mt-3 text-balance text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className={cn("text-base leading-relaxed text-espresso-500", eyebrow && "mt-4")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
