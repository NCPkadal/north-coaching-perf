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
  serviceFocus?: string[];
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
  const focusServices = programs.serviceFocus ?? [];
  const mainTiers = programs.tiers.slice(0, 3);
  const otherTiers = programs.tiers.slice(3);

  return (
    <section
      id="programs"
      className="scroll-mt-20 border-t border-slate-200 bg-slate-50 px-4 py-24 sm:px-6 lg:px-8"
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
            className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {programs.title}
          </h2>
          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-2xl text-slate-600"
          >
            {programs.subtitle}
          </motion.p>
        </motion.div>

        {focusServices.length === 3 && (
          <motion.div
            className="mt-14 grid gap-6 sm:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {focusServices.map((label, i) => (
              <motion.div key={label} variants={item} className="text-center">
                <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
                  <span className="text-sm font-medium uppercase tracking-wider text-brand-blue">
                    {i + 1}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{label}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {mainTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "tween", duration: 0.18 }}
            >
              <Card
                className={cn(
                  "h-full flex flex-col border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md",
                  tier.featured && "ring-1 ring-brand-blue/30"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-medium text-slate-900">{tier.name}</CardTitle>
                    {tier.featured && (
                      <span className="rounded-full bg-brand-blue-muted px-2.5 py-0.5 text-xs font-medium text-brand-blue">
                        {programs.labels.popular}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-slate-600">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-5 pt-0">
                  <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {programs.labels.price}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">{tier.priceLabel}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {programs.labels.whatsIncluded}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {tier.whatsIncluded.slice(0, 3).map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Accordion type="single" collapsible className="mt-1">
                    <AccordionItem value={`details-${tier.id}`} className="border-slate-200">
                      <AccordionTrigger className="text-left text-slate-800 hover:text-slate-900 [&>svg]:text-slate-500">
                        {programs.labels.details ?? "Details"}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        <div className="space-y-5">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                              {programs.labels.whoItsFor}
                            </p>
                            <p className="mt-1 text-sm text-slate-700">{tier.whoItsFor}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                              {programs.labels.whatsIncluded}
                            </p>
                            <ul className="mt-2 space-y-1.5">
                              {tier.whatsIncluded.map((inc) => (
                                <li key={inc} className="flex items-start gap-2 text-sm text-slate-700">
                                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                                  {inc}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                              {programs.labels.expectedOutcomes}
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-slate-600">
                              {tier.expectedOutcomes.map((out) => (
                                <li key={out}>· {out}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {otherTiers.length > 0 && (
          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-1 lg:grid-cols-1"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {otherTiers.map((tier) => (
              <motion.div key={tier.id} variants={item}>
                <Card className="flex flex-col border-slate-200 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-slate-900">{tier.name}</CardTitle>
                    <CardDescription className="text-slate-600">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-3 pt-0">
                    <p className="text-sm text-slate-600">{tier.whoItsFor}</p>
                    <ul className="space-y-1 text-sm text-slate-600">
                      {tier.whatsIncluded.map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                    <p className="pt-2 text-sm font-medium text-slate-800">{tier.priceLabel}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {programs.ctaTitle && programs.ctaButton && (
          <motion.div
            className="mt-16 flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg font-medium text-slate-800">{programs.ctaTitle}</p>
            <Link href={`${base}/#booking`}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToBooking();
                }}
                className="rounded-md bg-brand-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-blue-hover"
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
          <h3 className="text-xl font-semibold text-slate-900">
            {programs.faqTitle}
          </h3>
          <Accordion type="single" collapsible className="mt-6">
            {programs.faq.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-slate-200">
                <AccordionTrigger className="text-left text-slate-800 hover:text-slate-900 [&>svg]:text-slate-500">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
