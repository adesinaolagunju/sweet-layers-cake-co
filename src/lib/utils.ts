/**
 * Merge conditional class names into a single string.
 * Lightweight stand-in for clsx/tailwind-merge; swap later if needed.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
