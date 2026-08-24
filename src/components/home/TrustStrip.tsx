"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

import { EASE_OUT as easeOut } from "@/lib/animations";

function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: easeOut,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix ? <span className="text-gold-600">{suffix}</span> : null}
    </span>
  );
}

const stats = [
  { value: 500, suffix: "+", label: "Cakes Delivered" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "", label: "Star Reviews" },
];

export function TrustStrip() {
  return (
    <section
      id="trust"
      aria-label="Why customers trust Sweet Layers"
      className="scroll-mt-24 border-y border-espresso-900/5 bg-white"
    >
      <Container className="grid grid-cols-1 divide-y divide-espresso-900/5 py-10 text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center px-4 py-6 sm:py-2">
            <p className="font-serif text-4xl font-bold tabular-nums text-espresso-900">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-espresso-500">
              {stat.label}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
