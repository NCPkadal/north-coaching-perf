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
      className="scroll-mt-24 border-t border-charcoal-800 px-4 py-16 sm:px-6 lg:px-8"
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
            className="text-3xl font-semibold tracking-tight text-silver-100 sm:text-4xl"
            variants={item}
          >
            {whyNcp.title}
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {whyNcp.items.map((entry, index) => {
            const Icon = iconMap[index as 0 | 1 | 2] ?? ShieldCheck;
            return (
              <motion.div key={entry.title} variants={item}>
                <Card className="h-full border-charcoal-700 bg-charcoal-900/60">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-charcoal-600 bg-charcoal-800 text-silver-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg text-silver-50">
                        {entry.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-silver-400">{entry.description}</p>
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

