"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Layers, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/contexts/i18n-context";

const PORTRAIT_IMAGE = "/brand/portrait.png";

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
    founder: { name: string; title: string; location: string; bio: string; bioParagraphs?: string[] };
    credentialsTitle?: string;
    credentialsSummary?: string;
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
                  src={PORTRAIT_IMAGE}
                  alt={about.founder.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                  onError={() => setPortraitError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-slate-400">
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
                {about.founder.title}
                {about.founder.location ? ` · ${about.founder.location}` : ""}
              </p>
              {about.founder.bioParagraphs && about.founder.bioParagraphs.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {about.founder.bioParagraphs.map((paragraph, i) => (
                    <p key={i} className="leading-relaxed text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-4 leading-relaxed text-slate-600">{about.founder.bio}</p>
              )}
            </div>
          </motion.div>
        </motion.div>

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

