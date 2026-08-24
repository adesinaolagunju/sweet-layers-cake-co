"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Visual-only newsletter signup — no backend wired up yet.
 * Shows an optimistic confirmation message on submit.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <form
      className="mt-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubscribed(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 w-full min-w-0 rounded-full border border-cream-100/20 bg-white/10 px-4 text-sm text-cream-50 transition-colors placeholder:text-cream-200/60 hover:border-cream-100/35 focus:border-gold-400/60 focus:outline-none focus:ring-2 focus:ring-gold-400/60"
        />
        <Button type="submit" size="sm" className="shrink-0">
          Join
        </Button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-5 text-xs leading-5 text-gold-300">
        {subscribed
          ? "You're on the list — sweet things coming your way."
          : "Monthly flavour drops and seasonal menus. Zero spam, pinky promise."}
      </p>
    </form>
  );
}
