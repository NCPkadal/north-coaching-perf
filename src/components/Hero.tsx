"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n-context";
import { gtmCtaBookingClick } from "@/lib/gtm";

const HERO_IMAGE = "/brand/hero-bg.png";

export function Hero() {
  const { copy } = useI18n();
  const hero = copy.hero as Record<string, string>;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden sm:min-h-[85vh]"
      aria-labelledby="hero-heading"
    >
      {/* Background image: slight desaturation + increased contrast (stays in color) */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center sm:object-right"
          style={{
            filter: "saturate(0.82) contrast(1.12)",
          }}
          sizes="100vw"
        />
      </div>

      {/* Dark gradient overlay: left to right — strong on left for text, fades so athlete stays visible on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.2) 70%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Content: left-aligned, text on the left */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <motion.h1
            id="hero-heading"
            className="text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="mt-6 text-lg font-normal tracking-wide text-silver-200 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.tagline}
          </motion.p>
          <motion.p
            className="mt-2 text-sm font-medium tracking-wide text-silver-400 sm:text-base"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.raceWeekendLine}
          </motion.p>
          <motion.p
            className="mt-8 text-base leading-relaxed text-silver-300 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.pitchLine}
          </motion.p>
          <motion.p
            className="mt-4 text-sm font-medium tracking-wide text-silver-400"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.valueProposition}
          </motion.p>
          <motion.div
            className="mt-14 flex flex-wrap justify-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              size="lg"
              className="w-full max-w-xs bg-brand-blue text-white hover:bg-brand-blue-hover sm:w-auto"
              onClick={() => {
                gtmCtaBookingClick("hero");
                scrollTo("booking");
              }}
              aria-label="Book a Discovery Call"
            >
              {hero.ctaPrimary}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full max-w-xs border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-brand-blue/50 hover:bg-white/20 sm:w-auto"
              onClick={() => scrollTo("programs")}
              aria-label="View Programs"
            >
              {hero.ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
