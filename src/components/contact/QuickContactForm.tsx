"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, X } from "lucide-react";
import { useState } from "react";

import { EASE_OUT as easeOut } from "@/lib/animations";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "We'd love to know your name.";
  if (!form.email.trim()) errors.email = "We need an email to write back.";
  else if (!EMAIL_PATTERN.test(form.email)) errors.email = "That email looks a little off — mind double-checking?";
  if (form.message.trim().length < 10) errors.message = "Give us a few words so we can help properly.";
  return errors;
}

function baseInputClass(hasError: boolean): string {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-espresso-900 transition-colors duration-200 placeholder:text-espresso-400 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
      : "border-espresso-900/15 hover:border-espresso-900/30 focus:border-rose-300 focus:ring-rose-100"
  }`;
}

const labelClass = "mb-2 block text-sm font-medium text-espresso-800";

function FieldMessage({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          key={message}
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium leading-snug text-rose-600"
        >
          <X className="mt-0.5 size-3 shrink-0" strokeWidth={3} aria-hidden />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function QuickContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong on our end — please try again, or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center py-8 text-center"
        role="status"
        aria-live="polite"
      >
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.45, duration: 0.7 }}
          className="flex size-16 items-center justify-center rounded-full bg-gold-100 ring-1 ring-gold-300"
        >
          <Check className="size-8 text-gold-600" strokeWidth={3} aria-hidden />
        </motion.span>
        <h3 className="mt-5 font-serif text-2xl font-bold text-espresso-900">Message sent!</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-espresso-600">
          Thanks, {form.name.trim().split(/\s+/)[0]} — we&apos;ll get back to you within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(INITIAL_FORM);
            setSubmitted(false);
          }}
          className="mt-6 rounded-full px-5 py-2.5 text-sm font-semibold text-espresso-600 transition-colors hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — invisible to humans, catnip to bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="qc-name" className={labelClass}>
            Your name
          </label>
          <input
            id="qc-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => setField("name", event.target.value)}
            placeholder="First and last"
            className={baseInputClass(Boolean(errors.name))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "qc-name-error" : undefined}
          />
          <FieldMessage id="qc-name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="qc-email" className={labelClass}>
            Email
          </label>
          <input
            id="qc-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
            placeholder="you@example.com"
            className={baseInputClass(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "qc-email-error" : undefined}
          />
          <FieldMessage id="qc-email-error" message={errors.email} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="qc-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="qc-message"
          rows={5}
          maxLength={1000}
          value={form.message}
          onChange={(event) => setField("message", event.target.value)}
          placeholder="What's on your mind?"
          className={`${baseInputClass(Boolean(errors.message))} resize-y leading-relaxed`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "qc-message-error" : undefined}
        />
        <FieldMessage id="qc-message-error" message={errors.message} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso-900 px-7 py-3.5 text-sm font-semibold text-cream-50 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-espresso-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>

      <div aria-live="polite">
        <AnimatePresence>
          {submitError && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm leading-relaxed text-rose-700 ring-1 ring-rose-200"
            >
              {submitError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
