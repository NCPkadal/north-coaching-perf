"use client";

import { motion } from "framer-motion";
import { ShieldCheck, LineChart, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/contexts/i18n-context";

const iconMap = {
  0: ShieldCheck,
  1: LineChart,
  2: EyeOff,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function WhyNCP() {
  const { copy } = useI18n();
  const whyNcp = copy.whyNcp as { title: string; items: Array<{ title: string; description: string }> };

  return (
    <section
      id="why-ncp"
      className="scroll-mt-20 border-t border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="why-ncp-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.h2
            id="why-ncp-heading"
            className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
            variants={item}
          >
            {whyNcp.title}
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-8 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {whyNcp.items.map((entry, index) => {
            const Icon = iconMap[index as 0 | 1 | 2] ?? ShieldCheck;
            return (
              <motion.div key={entry.title} variants={item}>
                <Card className="h-full border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-muted text-brand-blue">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg font-medium text-slate-900">
                        {entry.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm leading-relaxed text-slate-600">{entry.description}</p>
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

