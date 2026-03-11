"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n-context";

export function Hero() {
  const { copy } = useI18n();
  const hero = copy.hero as Record<string, string>;
  const bookingRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          id="hero-heading"
          className="text-4xl font-bold tracking-tight text-silver-100 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.title}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg font-medium tracking-wide text-silver-400 sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.tagline}
        </motion.p>
        <motion.p
          className="mt-2 text-sm font-medium tracking-wide text-silver-500 sm:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.raceWeekendLine}
        </motion.p>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver-400 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.pitchLine}
        </motion.p>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-sm font-medium tracking-wide text-silver-500"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.valueProposition}
        </motion.p>
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            size="lg"
            onClick={() => scrollTo("booking")}
            aria-label="Book a Discovery Call"
          >
            {hero.ctaPrimary}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollTo("programs")}
            aria-label="View Programs"
          >
            {hero.ctaSecondary}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
