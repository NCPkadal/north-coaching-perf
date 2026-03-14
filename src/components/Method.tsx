"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/contexts/i18n-context";

type MethodStep = {
  number: string;
  title: string;
  description: string;
};

type MethodCopy = {
  title: string;
  subtitle: string;
  steps: MethodStep[];
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export function Method() {
  const { copy } = useI18n();
  const method = copy.method as MethodCopy;

  return (
    <section
      id="method"
      className="border-t border-slate-200 bg-white px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="method-heading"
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
            id="method-heading"
            className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
            variants={item}
          >
            {method.title}
          </motion.h2>
          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-2xl text-slate-600"
          >
            {method.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {method.steps.map((step) => (
            <motion.div
              key={step.number}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "tween", duration: 0.18 }}
            >
              <Card className="h-full border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="text-5xl font-semibold tracking-tight text-slate-200">
                      {step.number}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-brand-blue/30 via-brand-blue/10 to-transparent" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
