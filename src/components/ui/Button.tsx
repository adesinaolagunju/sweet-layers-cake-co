import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "outlineLight";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-espresso-900 shadow-soft hover:bg-gold-400 hover:shadow-card active:scale-[0.98]",
  secondary:
    "bg-rose-600 text-cream-50 shadow-soft hover:bg-rose-700 hover:shadow-card active:scale-[0.98]",
  outline:
    "border border-espresso-800/20 bg-transparent text-espresso-900 hover:border-espresso-800/40 hover:bg-cream-100 active:scale-[0.98]",
  ghost:
    "text-espresso-700 hover:bg-cream-100 hover:text-espresso-900 active:scale-[0.98]",
  outlineLight:
    "border border-cream-50/50 bg-cream-50/10 text-cream-50 backdrop-blur-sm hover:bg-cream-50/20 active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-5 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

function buttonClasses(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({ variant = "primary", size = "md", className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
