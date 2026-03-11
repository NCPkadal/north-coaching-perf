"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/contexts/i18n-context";
import { cn } from "@/lib/utils";

type ProgramTier = {
  id: string;
  name: string;
  description: string;
  whoItsFor: string;
  whatsIncluded: string[];
  expectedOutcomes: string[];
  priceLabel: string;
  featured?: boolean;
};

type ProgramCopy = {
  title: string;
  subtitle: string;
  tiers: ProgramTier[];
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
  labels: Record<string, string>;
  ctaTitle?: string;
  ctaButton?: string;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Programs() {
  const { copy, locale } = useI18n();
  const programs = copy.programs as ProgramCopy;
  const base = `/${locale}`;
  const scrollToBooking = () => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section
      id="programs"
      className="scroll-mt-20 border-t border-charcoal-800 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="programs-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <h2
            id="programs-heading"
            className="text-3xl font-bold tracking-tight text-silver-100 sm:text-4xl"
          >
            {programs.title}
          </h2>
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-2xl text-silver-500"
          >
            {programs.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {programs.tiers.map((tier) => (
            <motion.div key={tier.id} variants={item}>
              <Card
                className={cn(
                  "h-full flex flex-col border-charcoal-700 bg-charcoal-900/50 transition-all duration-300 hover:border-charcoal-600 hover:shadow-lg hover:shadow-charcoal-950/50",
                  tier.featured && "ring-1 ring-silver-500/30"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    {tier.featured && (
                      <span className="rounded-full bg-charcoal-700 px-2 py-0.5 text-xs font-medium text-silver-400">
                        {programs.labels.popular}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-silver-500">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4 pt-0">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-silver-500">
                      {programs.labels.whoItsFor}
                    </p>
                    <p className="mt-1 text-sm text-silver-400">{tier.whoItsFor}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-silver-500">
                      {programs.labels.whatsIncluded}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {tier.whatsIncluded.map((inc) => (
                        <li
                          key={inc}
                          className="flex items-start gap-2 text-sm text-silver-400"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-silver-500" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-silver-500">
                      {programs.labels.expectedOutcomes}
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-silver-500">
                      {tier.expectedOutcomes.map((out) => (
                        <li key={out}>· {out}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-silver-500">
                      {programs.labels.price}
                    </p>
                    <p className="mt-1 font-medium text-silver-300">
                      {tier.priceLabel}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {programs.ctaTitle && programs.ctaButton && (
          <motion.div
            className="mt-16 flex flex-col items-center justify-center gap-4 rounded-xl border border-charcoal-700 bg-charcoal-900/40 px-6 py-10 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg font-medium text-silver-200">{programs.ctaTitle}</p>
            <Link href={`${base}/#booking`}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToBooking();
                }}
                className="rounded-md border border-silver-500/40 bg-charcoal-800 px-6 py-3 text-sm font-medium text-silver-100 transition-colors hover:bg-charcoal-700 hover:border-silver-500/60"
              >
                {programs.ctaButton}
              </button>
            </Link>
          </motion.div>
        )}

        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-silver-200">
            {programs.faqTitle}
          </h3>
          <Accordion type="single" collapsible className="mt-6">
            {programs.faq.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
