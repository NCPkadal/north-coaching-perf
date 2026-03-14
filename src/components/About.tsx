"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Layers, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/contexts/i18n-context";

const pillarIcons = {
  assess: Target,
  build: Layers,
  sustain: RefreshCw,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function About() {
  const [portraitError, setPortraitError] = useState(false);
  const { copy } = useI18n();
  const about = copy.about as {
    title: string;
    founder: { name: string; title: string; location: string; bio: string };
    credentialsTitle?: string;
    credentials?: Array<{ period: string; title: string; organisation: string }>;
    pillars: {
      title: string;
      assess: { title: string; description: string };
      build: { title: string; description: string };
      sustain: { title: string; description: string };
    };
  };
  const pillars = [
    { key: "assess" as const, ...about.pillars.assess },
    { key: "build" as const, ...about.pillars.build },
    { key: "sustain" as const, ...about.pillars.sustain },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-slate-200 bg-white px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
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
            id="about-heading"
            className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {about.title}
          </h2>
          <motion.div
            variants={item}
            className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-8 sm:flex-row sm:items-start"
          >
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100">
              {!portraitError ? (
                <Image
                  src="/brand/portrait.png"
                  alt={about.founder.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                  onError={() => setPortraitError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-silver-500">
                  {about.founder.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
            <p className="text-lg font-medium text-slate-900">{about.founder.name}</p>
            <p className="mt-1 text-sm text-slate-600">
              {about.founder.title} · {about.founder.location}
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              {about.founder.bio}
            </p>
            </div>
          </motion.div>
        </motion.div>

        {about.credentialsTitle && about.credentials && about.credentials.length > 0 && (
          <motion.div
            className="mx-auto mt-12 max-w-2xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
              {about.credentialsTitle}
            </h3>
            <ul className="mt-6 space-y-4 border-t border-slate-200 pt-6">
              {about.credentials.map((item, i) => (
                <li key={i} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-slate-500 sm:w-28">
                    {item.period}
                  </span>
                  <span className="text-slate-800">
                    {item.title}
                    {item.organisation ? (
                      <span className="text-slate-600"> — {item.organisation}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.p
          className="mt-14 text-center text-sm font-medium uppercase tracking-widest text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {about.pillars.title}
        </motion.p>
        <motion.div
          className="mt-10 grid gap-8 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {pillars.map((pillar) => {
            const Icon = pillarIcons[pillar.key];
            return (
              <motion.div key={pillar.key} variants={item}>
                <Card className="h-full border-slate-200 bg-slate-50 shadow-sm transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-muted text-brand-blue">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg font-medium text-slate-900">{pillar.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

