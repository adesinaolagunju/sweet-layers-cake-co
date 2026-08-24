"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CloudUpload,
  ImagePlus,
  Loader2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { InquirySuccess } from "@/components/custom-order/InquirySuccess";
import { flavorGroups } from "@/data/menu";
import type { InquiryPayload } from "@/types";

import {
  EASE_OUT as easeOut,
  fadeInUp,
  staggerContainer,
  type Variants,
} from "@/lib/animations";

const OCCASIONS = [
  "Wedding",
  "Birthday",
  "Corporate Event",
  "Baby Shower",
  "Anniversary",
  "Graduation",
  "Just Because",
  "Something Else",
];

const SERVINGS_OPTIONS = ["Up to 15 guests", "15–30 guests", "30–60 guests", "60–100 guests", "100+ guests"];

const BUDGET_OPTIONS = ["Under $150", "$150 – $300", "$300 – $600", "$600 +", "Not sure yet"];

const SPONGE_FLAVORS =
  flavorGroups.find((group) => group.id === "sponges")?.options.map((option) => option.name) ?? [];

const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

type PreferredContact = (typeof CONTACT_METHODS)[number]["value"];
type StepIndex = 0 | 1 | 2;
type Errors = Partial<Record<string, string>>;

interface FormState {
  occasion: string;
  occasionOther: string;
  eventDate: string;
  servings: string;
  budget: string;
  flavors: string[];
  description: string;
  contactName: string;
  email: string;
  phone: string;
  preferredContact: PreferredContact;
}

const INITIAL_FORM: FormState = {
  occasion: "",
  occasionOther: "",
  eventDate: "",
  servings: "",
  budget: "",
  flavors: [],
  description: "",
  contactName: "",
  email: "",
  phone: "",
  preferredContact: "email",
};

const STEPS: Array<{ title: string; blurb: string }> = [
  { title: "The Celebration", blurb: "First, the important details." },
  { title: "The Cake", blurb: "Flavours, dreams & inspiration." },
  { title: "Say Hello", blurb: "Where should we send your quote?" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

function validateStep(step: StepIndex, form: FormState): Errors {
  const errors: Errors = {};
  if (step === 0) {
    if (!form.occasion) errors.occasion = "Pick the occasion we're celebrating — 'Just Because' counts.";
    else if (form.occasion === "Something Else" && !form.occasionOther.trim())
      errors.occasionOther = "Tell us what we're celebrating!";
    if (!form.eventDate) errors.eventDate = "Add your event date so we can check availability.";
    else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(`${form.eventDate}T00:00:00`) < today)
        errors.eventDate = "That date already happened — pick one in the future.";
    }
    if (!form.servings) errors.servings = "Roughly how many guests are we feeding?";
  }
  if (step === 1) {
    if (form.flavors.length === 0) errors.flavors = "Choose at least one flavour — you can refine it later.";
    if (form.description.trim().length < 12)
      errors.description = "Tell us a little about your dream cake — even one sentence helps.";
  }
  if (step === 2) {
    if (!form.contactName.trim()) errors.contactName = "We'd love to know who we're baking for.";
    if (!form.email.trim()) errors.email = "We need an email address to send your quote.";
    else if (!EMAIL_PATTERN.test(form.email)) errors.email = "That email looks a little off — mind double-checking?";
    if (form.phone.trim() && form.phone.replace(/\D/g, "").length < 7)
      errors.phone = "That phone number looks short — mind checking it?";
  }
  return errors;
}

function validateAll(form: FormState): Errors {
  return { ...validateStep(0, form), ...validateStep(1, form), ...validateStep(2, form) };
}

/* ------------------------------------------------------------------ */

const labelClass = "mb-2 block text-sm font-medium text-espresso-800";
const optionalHint = <span className="font-normal text-espresso-400"> (optional)</span>;

function baseInputClass(hasError: boolean): string {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-espresso-900 shadow-none transition-colors duration-200 placeholder:text-espresso-400 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
      : "border-espresso-900/15 hover:border-espresso-900/30 focus:border-rose-300 focus:ring-rose-100"
  }`;
}

function chipClass(active: boolean): string {
  return `cursor-pointer inline-flex min-h-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-200 sm:px-5 ${
    active
      ? "border-espresso-900 bg-espresso-900 text-cream-50 shadow-card"
      : "border-espresso-900/15 bg-white text-espresso-700 hover:border-rose-300 hover:text-rose-600"
  } focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-rose-500`;
}

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

const panelVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction >= 0 ? 44 : -44 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction >= 0 ? -44 : 44 }),
};

const groupVariants = staggerContainer(0.07);
const itemVariants: Variants = fadeInUp;

interface PhotoPreview {
  id: string;
  name: string;
  url: string;
}

export function CustomOrderForm() {
  const [step, setStep] = useState<StepIndex>(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const shakeControls = useAnimationControls();

  // Revoke object URLs so previews never leak memory.
  useEffect(() => {
    return () => photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Computed after mount — avoids shipping a stale date-min attribute in the
     static HTML (hydration mismatch when the build and visit fall on
     different days). */
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      setMinDate(`${now.getFullYear()}-${month}-${day}`);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const goTo = (target: StepIndex) => {
    if (target === step) return;
    setDirection(target > step ? 1 : -1);
    setErrors({});
    setStep(target);
  };

  const advance = () => {
    const stepErrors = validateStep(step, form);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) {
      void shakeControls.start({ x: [0, -10, 10, -5, 0], transition: { duration: 0.4, ease: easeOut } });
      return;
    }
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, 2) as StepIndex);
  };

  const addPhotos = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const incoming = Array.from(fileList);
    const accepted: PhotoPreview[] = [];
    let problem: string | undefined;

    for (const file of incoming) {
      if (photos.length + accepted.length >= MAX_PHOTOS) {
        problem = `${MAX_PHOTOS} photos max — that's plenty of inspiration!`;
        break;
      }
      if (!file.type.startsWith("image/") || file.size > MAX_PHOTO_BYTES) {
        problem = "Photos must be image files under 5 MB each.";
        continue;
      }
      accepted.push({ id: crypto.randomUUID(), name: file.name, url: URL.createObjectURL(file) });
    }

    if (accepted.length > 0) setPhotos((prev) => [...prev, ...accepted]);
    setErrors((prev) => ({ ...prev, photos: problem }));
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((photo) => photo.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((photo) => photo.id !== id);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allErrors = validateAll(form);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) {
      void shakeControls.start({ x: [0, -10, 10, -5, 0], transition: { duration: 0.4, ease: easeOut } });
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const description = form.occasionOther.trim()
        ? `[${form.occasionOther.trim()}] ${form.description.trim()}`
        : form.description.trim();

      const payload: InquiryPayload & { website?: string } = {
        occasion: form.occasion,
        eventDate: form.eventDate,
        servings: form.servings,
        budget: form.budget || undefined,
        flavors: form.flavors,
        description,
        photoNames: photos.map((photo) => photo.name),
        contactName: form.contactName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        preferredContact: form.preferredContact,
        website: honeypot,
      };

      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong on our end — please try again in a moment, or email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const dateLabel = form.eventDate
    ? new Date(`${form.eventDate}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-espresso-900/5 sm:p-10">
      {submitted ? (
        <InquirySuccess
          firstName={form.contactName.trim().split(/\s+/)[0]}
          onReset={() => {
            setForm(INITIAL_FORM);
            setPhotos([]);
            setStep(0);
            setDirection(-1);
            setSubmitted(false);
          }}
        />
      ) : (
        <>
          {/* Progress indicator */}
          <ol className="mb-10 flex items-center gap-2 sm:gap-3" aria-label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step].title}`}>
            {STEPS.map((meta, index) => {
              const isDone = index < step;
              const isActive = index === step;
              return (
                <li key={meta.title} className="flex flex-1 items-center gap-2 sm:gap-3 last:flex-none">
                  <button
                    type="button"
                    onClick={() => isDone && goTo(index as StepIndex)}
                    disabled={index > step}
                    aria-current={isActive ? "step" : undefined}
                    className="flex items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:cursor-default sm:gap-3"
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors duration-300 ${
                        isDone
                          ? "border-gold-400 bg-gold-400 text-espresso-900"
                          : isActive
                            ? "border-espresso-900 bg-espresso-900 text-cream-50"
                            : "border-espresso-900/20 text-espresso-400"
                      }`}
                    >
                      {isDone ? <Check className="size-4" aria-hidden /> : index + 1}
                    </span>
                    <span
                      className={`hidden text-xs font-semibold uppercase tracking-[0.14em] lg:block ${
                        isActive ? "text-espresso-900" : "text-espresso-400"
                      }`}
                    >
                      {meta.title}
                    </span>
                  </button>
                  {index < STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className={`h-px flex-1 transition-colors duration-500 ${
                        index < step ? "bg-gold-400" : "bg-espresso-900/10"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>

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

          <form onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={step}
                custom={direction}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: easeOut }}
              >
                <motion.div animate={shakeControls}>
                  <motion.div variants={groupVariants} initial="hidden" animate="show">
                    <motion.div variants={itemVariants}>
                      <h2 className="font-serif text-2xl font-semibold text-espresso-900">
                        {STEPS[step].title}
                      </h2>
                      <p className="mt-1 text-sm text-espresso-500">{STEPS[step].blurb}</p>
                    </motion.div>

                    {/* ------------------------- STEP 1 ------------------------- */}
                    {step === 0 && (
                      <>
                        <motion.div variants={itemVariants} className="mt-8">
                          <span id="occasion-label" className={labelClass}>
                            What are we celebrating?
                          </span>
                          <div role="radiogroup" aria-labelledby="occasion-label" className="flex flex-wrap gap-2.5">
                            {OCCASIONS.map((occasion) => (
                              <label key={occasion} className={chipClass(form.occasion === occasion)}>
                                <input
                                  type="radio"
                                  name="occasion"
                                  value={occasion}
                                  checked={form.occasion === occasion}
                                  onChange={() => setField("occasion", occasion)}
                                  className="sr-only"
                                />
                                {occasion}
                              </label>
                            ))}
                          </div>
                          <FieldMessage id="occasion-error" message={errors.occasion} />
                          <AnimatePresence initial={false}>
                            {form.occasion === "Something Else" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: easeOut }}
                                className="overflow-hidden"
                              >
                                <div className="pt-3">
                                  <label htmlFor="occasionOther" className="sr-only">
                                    Tell us what you&apos;re celebrating
                                  </label>
                                  <input
                                    id="occasionOther"
                                    type="text"
                                    value={form.occasionOther}
                                    onChange={(event) => setField("occasionOther", event.target.value)}
                                    placeholder="Tell us what&apos;s happening! e.g. &apos;Book club&apos;s 10th anniversary&apos;"
                                    className={baseInputClass(Boolean(errors.occasionOther))}
                                    aria-invalid={Boolean(errors.occasionOther)}
                                    aria-describedby={errors.occasionOther ? "occasion-other-error" : undefined}
                                  />
                                  <FieldMessage id="occasion-other-error" message={errors.occasionOther} />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6">
                          <label htmlFor="eventDate" className={labelClass}>
                            Event date
                          </label>
                          <input
                            id="eventDate"
                            type="date"
                            min={minDate}
                            value={form.eventDate}
                            onChange={(event) => setField("eventDate", event.target.value)}
                            className={baseInputClass(Boolean(errors.eventDate))}
                            aria-invalid={Boolean(errors.eventDate)}
                            aria-describedby={errors.eventDate ? "event-date-error" : undefined}
                          />
                          <p className="mt-1.5 text-xs text-espresso-400">
                            Weekends fill up fast — the earlier the better.
                          </p>
                          <FieldMessage id="event-date-error" message={errors.eventDate} />
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6 grid gap-6 sm:grid-cols-2">
                          <div>
                            <label htmlFor="servings" className={labelClass}>
                              Servings needed
                            </label>
                            <div className="relative">
                              <select
                                id="servings"
                                value={form.servings}
                                onChange={(event) => setField("servings", event.target.value)}
                                className={`${baseInputClass(Boolean(errors.servings))} appearance-none pr-10`}
                                aria-invalid={Boolean(errors.servings)}
                                aria-describedby={errors.servings ? "servings-error" : undefined}
                              >
                                <option value="" disabled>
                                  Choose a range…
                                </option>
                                {SERVINGS_OPTIONS.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-espresso-400" aria-hidden />
                            </div>
                            <FieldMessage id="servings-error" message={errors.servings} />
                          </div>
                          <div>
                            <label htmlFor="budget" className={labelClass}>
                              Budget range{optionalHint}
                            </label>
                            <div className="relative">
                              <select
                                id="budget"
                                value={form.budget}
                                onChange={(event) => setField("budget", event.target.value)}
                                className={`${baseInputClass(false)} appearance-none pr-10`}
                              >
                                <option value="">Prefer not to say</option>
                                {BUDGET_OPTIONS.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-espresso-400" aria-hidden />
                            </div>
                            <p className="mt-1.5 text-xs text-espresso-400">Helps us suggest the right design.</p>
                          </div>
                        </motion.div>
                      </>
                    )}

                    {/* ------------------------- STEP 2 ------------------------- */}
                    {step === 1 && (
                      <>
                        <motion.div variants={itemVariants} className="mt-8">
                          <span id="flavors-label" className={labelClass}>
                            Flavour preferences{" "}
                            <span className="font-normal text-espresso-400">(choose any)</span>
                          </span>
                          <div role="group" aria-labelledby="flavors-label" className="flex flex-wrap gap-2.5">
                            {SPONGE_FLAVORS.map((flavor) => (
                              <label key={flavor} className={chipClass(form.flavors.includes(flavor))}>
                                <input
                                  type="checkbox"
                                  name="flavors"
                                  value={flavor}
                                  checked={form.flavors.includes(flavor)}
                                  onChange={(event) =>
                                    setField(
                                      "flavors",
                                      event.target.checked
                                        ? [...form.flavors, flavor]
                                        : form.flavors.filter((f) => f !== flavor),
                                    )
                                  }
                                  className="sr-only"
                                />
                                {flavor}
                              </label>
                            ))}
                          </div>
                          <FieldMessage id="flavors-error" message={errors.flavors} />
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6">
                          <label htmlFor="description" className={labelClass}>
                            Design inspiration
                          </label>
                          <textarea
                            id="description"
                            rows={5}
                            maxLength={1200}
                            value={form.description}
                            onChange={(event) => setField("description", event.target.value)}
                            placeholder="Theme, colours, flowers, hobbies, the Pinterest board you've been hoarding since March…"
                            className={`${baseInputClass(Boolean(errors.description))} resize-y leading-relaxed`}
                            aria-invalid={Boolean(errors.description)}
                            aria-describedby={errors.description ? "description-error" : undefined}
                          />
                          <FieldMessage id="description-error" message={errors.description} />
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6">
                          <span id="photos-label" className={labelClass}>
                            Inspiration photos{optionalHint}
                          </span>
                          <label
                            htmlFor="photo-upload"
                            onDragOver={(event) => {
                              event.preventDefault();
                              setDragging(true);
                            }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={(event) => {
                              event.preventDefault();
                              setDragging(false);
                              addPhotos(event.dataTransfer.files);
                            }}
                            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-7 text-center transition-all duration-200 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-rose-500 ${
                              dragging
                                ? "border-rose-300 bg-rose-50/50"
                                : "border-espresso-900/20 bg-white hover:border-gold-400 hover:bg-cream-50"
                            }`}
                          >
                            <input
                              id="photo-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(event) => {
                                addPhotos(event.target.files);
                                event.target.value = "";
                              }}
                              className="sr-only"
                            />
                            {dragging ? (
                              <ImagePlus className="size-7 text-rose-400" aria-hidden />
                            ) : (
                              <CloudUpload className="size-7 text-espresso-400" aria-hidden />
                            )}
                            <span className="text-sm font-medium text-espresso-700">
                              Drag &amp; drop photos here, or{" "}
                              <span className="font-semibold text-rose-600 underline underline-offset-2">browse</span>
                            </span>
                            <span className="text-xs text-espresso-400">
                              Up to {MAX_PHOTOS} images, under 5 MB each
                            </span>
                          </label>
                          <FieldMessage id="photos-error" message={errors.photos} />

                          {photos.length > 0 && (
                            <ul className="mt-4 grid grid-cols-3 gap-3">
                              {photos.map((photo) => (
                                <li key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-espresso-900/10">
                                  {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                                  <img src={photo.url} alt="" className="size-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => removePhoto(photo.id)}
                                    aria-label={`Remove ${photo.name}`}
                                    className="absolute right-1 top-1 flex size-11 items-center justify-center rounded-full bg-espresso-900/80 text-cream-50 transition-colors hover:bg-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                                  >
                                    <X className="size-3.5" strokeWidth={3} aria-hidden />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      </>
                    )}

                    {/* ------------------------- STEP 3 ------------------------- */}
                    {step === 2 && (
                      <>
                        <motion.p variants={itemVariants} className="mt-8 rounded-xl bg-cream-50 px-4 py-3 text-xs leading-relaxed text-espresso-500 ring-1 ring-espresso-900/5">
                          Sending: <strong className="font-semibold text-espresso-800">{form.occasion}</strong>
                          {dateLabel && <> · {dateLabel}</>} · {form.servings} · {form.flavors.length} flavour
                          {form.flavors.length === 1 ? "" : "s"}
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-6 grid gap-6 sm:grid-cols-2">
                          <div>
                            <label htmlFor="contactName" className={labelClass}>
                              Your name
                            </label>
                            <input
                              id="contactName"
                              type="text"
                              autoComplete="name"
                              value={form.contactName}
                              onChange={(event) => setField("contactName", event.target.value)}
                              placeholder="First and last"
                              className={baseInputClass(Boolean(errors.contactName))}
                              aria-invalid={Boolean(errors.contactName)}
                              aria-describedby={errors.contactName ? "contact-name-error" : undefined}
                            />
                            <FieldMessage id="contact-name-error" message={errors.contactName} />
                          </div>
                          <div>
                            <label htmlFor="phone" className={labelClass}>
                              Phone{optionalHint}
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              autoComplete="tel"
                              inputMode="tel"
                              value={form.phone}
                              onChange={(event) => setField("phone", event.target.value)}
                              placeholder="(555) 000-0000"
                              className={baseInputClass(Boolean(errors.phone))}
                              aria-invalid={Boolean(errors.phone)}
                              aria-describedby={errors.phone ? "phone-error" : undefined}
                            />
                            <FieldMessage id="phone-error" message={errors.phone} />
                          </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6">
                          <label htmlFor="email" className={labelClass}>
                            Email address
                          </label>
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            value={form.email}
                            onChange={(event) => setField("email", event.target.value)}
                            placeholder="you@example.com"
                            className={baseInputClass(Boolean(errors.email))}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "email-error" : undefined}
                          />
                          <FieldMessage id="email-error" message={errors.email} />
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6">
                          <span id="contact-method-label" className={labelClass}>
                            Preferred contact method
                          </span>
                          <div role="radiogroup" aria-labelledby="contact-method-label" className="flex flex-wrap gap-2.5">
                            {CONTACT_METHODS.map((method) => (
                              <label key={method.value} className={chipClass(form.preferredContact === method.value)}>
                                <input
                                  type="radio"
                                  name="preferredContact"
                                  value={method.value}
                                  checked={form.preferredContact === method.value}
                                  onChange={() => setField("preferredContact", method.value)}
                                  className="sr-only"
                                />
                                {method.label}
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}

                    {/* Navigation / submit */}
                    <motion.div variants={itemVariants} className="mt-10 flex items-center justify-between gap-4 border-t border-dashed border-espresso-900/10 pt-6">
                      {step > 0 ? (
                        <button
                          type="button"
                          onClick={() => goTo((step - 1) as StepIndex)}
                          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-espresso-600 transition-colors hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                        >
                          <ArrowLeft className="size-4" aria-hidden />
                          Back
                        </button>
                      ) : (
                        <span aria-hidden className="text-xs italic text-espresso-400">
                          Takes about 2 minutes
                        </span>
                      )}

                      {step < 2 ? (
                        <button
                          type="button"
                          onClick={advance}
                          className="inline-flex items-center gap-2 rounded-full bg-espresso-900 px-6 py-3 text-sm font-semibold text-cream-50 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-espresso-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:translate-y-0"
                        >
                          Continue
                          <ArrowRight className="size-4" aria-hidden />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="size-4 animate-spin" aria-hidden />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send My Inquiry
                              <ArrowRight className="size-4" aria-hidden />
                            </>
                          )}
                        </button>
                      )}
                    </motion.div>

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
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </form>
        </>
      )}
    </div>
  );
}
