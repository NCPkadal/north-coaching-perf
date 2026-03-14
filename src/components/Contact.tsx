"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n-context";
import { SITE_EMAIL, WHATSAPP_URL, LINKEDIN_URL } from "@/lib/site-config";
import { getContactFormEndpoint, submitToFormspree } from "@/lib/formspree";
import { gtmContactFormSubmit } from "@/lib/gtm";

export function Contact() {
  const { copy } = useI18n();
  const contact = copy.contact as Record<string, string>;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const endpoint = getContactFormEndpoint();
    try {
      if (endpoint) {
        const { ok } = await submitToFormspree(endpoint, {
          name,
          email,
          message,
          _subject: "NCP — Contact form",
        });
        if (!ok) throw new Error("Submit failed");
      } else {
        await new Promise((r) => setTimeout(r, 600));
        if (typeof window !== "undefined") {
          const stored = JSON.parse(localStorage.getItem("ncp-contact-messages") ?? "[]");
          stored.push({ name, email, message, at: new Date().toISOString() });
          localStorage.setItem("ncp-contact-messages", JSON.stringify(stored));
        }
      }
      setName("");
      setEmail("");
      setMessage("");
      setStatus("success");
      gtmContactFormSubmit();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-charcoal-800 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight text-silver-100 sm:text-4xl"
          >
            {contact.title}
          </h2>
          <p className="mt-4 text-silver-500">{contact.subtitle}</p>
          <div className="mx-auto mt-6 flex max-w-lg items-center justify-center gap-2 rounded-lg border border-charcoal-700 bg-charcoal-900/40 px-4 py-3">
            <Lock className="h-4 w-4 shrink-0 text-silver-500" />
            <p className="text-sm text-silver-400">{contact.confidentialityGuarantee}</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="flex items-center gap-2 text-silver-400 transition-colors hover:text-silver-200"
            >
              <Mail className="h-4 w-4" />
              <span>{SITE_EMAIL}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-silver-400 transition-colors hover:text-silver-200"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp +33 6 36 98 08 30</span>
            </a>
          </div>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 rounded-lg border border-charcoal-700 bg-charcoal-900/50 p-8 text-center"
          >
            <h3 className="text-xl font-semibold text-silver-200">
              {contact.successTitle}
            </h3>
            <p className="mt-2 text-silver-500">{contact.successMessage}</p>
            <Button
              variant="secondary"
              className="mt-6 w-full sm:w-auto"
              onClick={() => setStatus("idle")}
            >
              {contact.sendAnotherMessage}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="mt-12 space-y-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="block text-sm font-medium text-silver-400">
                  {contact.formName}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2 w-full rounded-md border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-silver-200 placeholder:text-charcoal-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-silver-400">
                  {contact.formEmail}
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-md border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-silver-200 placeholder:text-charcoal-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
                />
              </label>
            </div>
            <label className="block">
              <span className="block text-sm font-medium text-silver-400">
                {contact.formMessage}
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="mt-2 w-full resize-y rounded-md border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-silver-200 placeholder:text-charcoal-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
              />
            </label>
            {status === "error" && (
              <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
            )}
            <div className="flex flex-wrap items-center gap-6">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : contact.sendLabel}
              </Button>
              <div className="flex gap-4 text-sm text-silver-500">
                {LINKEDIN_URL && (
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-silver-300 focus:outline-none focus:ring-2 focus:ring-silver-500 focus:ring-offset-2 focus:ring-offset-charcoal-900"
                  >
                    {contact.linkedIn}
                  </a>
                )}
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
