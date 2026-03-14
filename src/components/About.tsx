"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Layers, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/contexts/i18n-context";

const ABOUT_BG_IMAGE = "/brand/about-bg.png";

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
      className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden border-t border-slate-200 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      {/* Full-screen About background — zoomed out to show the full photo (landscape + subject) */}
      <div className="absolute inset-[-20%]" aria-hidden>
        <Image
          src={ABOUT_BG_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Overlay for text readability — dark gradient so content stays legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.85) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <h2
            id="about-heading"
            className="text-3xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-4xl"
          >
            {about.title}
          </h2>
          <motion.div
            variants={item}
            className="mx-auto mt-12 max-w-2xl text-center"
          >
            <p className="text-lg font-medium text-white drop-shadow-sm">{about.founder.name}</p>
            <p className="mt-1 text-sm text-slate-200">
              {about.founder.title}
              {about.founder.location ? ` · ${about.founder.location}` : ""}
            </p>
            {about.founder.bioParagraphs && about.founder.bioParagraphs.length > 0 ? (
              <div className="mt-6 space-y-4">
                {about.founder.bioParagraphs.map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-slate-200">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-6 leading-relaxed text-slate-200">{about.founder.bio}</p>
            )}
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-14 text-center text-sm font-medium uppercase tracking-widest text-slate-300"
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
                <Card className="h-full border-white/20 bg-white/10 shadow-lg backdrop-blur-sm transition-shadow hover:bg-white/15 hover:shadow-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-muted text-brand-blue">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg font-medium text-white">{pillar.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm leading-relaxed text-slate-200">
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

