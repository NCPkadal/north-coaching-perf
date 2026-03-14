"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n-context";
import { getBookingFormEndpoint, submitToFormspree } from "@/lib/formspree";
import { gtmDiscoveryFormSubmit } from "@/lib/gtm";

export interface DiscoveryFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  goals: string;
  availability: string;
  timezone: string;
}

const initialForm: DiscoveryFormData = {
  name: "",
  email: "",
  phone: "",
  role: "",
  goals: "",
  availability: "",
  timezone: "",
};

type BookingCopy = Record<string, string> & { roleOptions: string[] };

export function Booking() {
  const { copy } = useI18n();
  const booking = copy.booking as BookingCopy;
  const [form, setForm] = useState<DiscoveryFormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    const endpoint = getBookingFormEndpoint();
    try {
      if (endpoint) {
        const { ok } = await submitToFormspree(endpoint, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          goals: form.goals,
          availability: form.availability,
          timezone: form.timezone,
          _subject: "NCP — Discovery Call request",
        });
        if (!ok) throw new Error("Submit failed");
      } else {
        await new Promise((r) => setTimeout(r, 600));
        if (typeof window !== "undefined") {
          const stored = JSON.parse(localStorage.getItem("ncp-discovery-requests") ?? "[]");
          stored.push({ ...form, submittedAt: new Date().toISOString() });
          localStorage.setItem("ncp-discovery-requests", JSON.stringify(stored));
        }
      }
      setForm(initialForm);
      setStatus("success");
      gtmDiscoveryFormSubmit();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="booking"
      className="scroll-mt-20 border-t border-charcoal-800 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            id="booking-heading"
            className="text-3xl font-bold tracking-tight text-silver-100 sm:text-4xl"
          >
            {booking.title}
          </h2>
          <p className="mt-4 text-silver-500">{booking.subtitle}</p>
          <div className="mt-4 rounded-lg border border-charcoal-700 bg-charcoal-900/40 px-4 py-3 text-center">
            <p className="text-sm font-medium text-silver-400">
              {booking.confidentialityGuarantee}
            </p>
          </div>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 rounded-lg border border-charcoal-700 bg-charcoal-900/50 p-8 text-center"
          >
            <h3 className="text-xl font-semibold text-silver-200">
              {booking.successTitle}
            </h3>
            <p className="mt-2 text-silver-500">{booking.successMessage}</p>
            <Button
              variant="secondary"
              className="mt-6 w-full sm:w-auto"
              onClick={() => setStatus("idle")}
            >
              {booking.submitAnotherRequest}
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
                  {booking.nameLabel}
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={booking.namePlaceholder}
                  required
                  className="mt-2 w-full rounded-md border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-silver-200 placeholder:text-charcoal-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-silver-400">
                  {booking.emailLabel}
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={booking.emailPlaceholder}
                  required
                  className="mt-2 w-full rounded-md border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-silver-200 placeholder:text-charcoal-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
                  autoComplete="email"
                />
              </label>
            </div>
            <label className="block">
              <span className="block text-sm font-medium text-silver-400">
                {booking.phoneLabel}
              </span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={booking.phonePlaceholder}
                className="mt-2 w-full rounded-md border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-silver-200 placeholder:text-charcoal-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
                autoComplete="tel"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-silver-400">
                {booking.roleLabel}
              </span>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-silver-200 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
              >
                <option value="">{booking.roleSelectPlaceholder}</option>
                {booking.roleOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-silver-400">
                {booking.goalsLabel}
              </span>
              <textarea
                name="goals"
                value={form.goals}
                onChange={handleChange}
                placeholder={booking.goalsPlaceholder}
                rows={3}
                className="mt-2 w-full resize-y rounded-md border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-silver-200 placeholder:text-charcoal-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
              />
            </label>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="block text-sm font-medium text-silver-400">
                  {booking.availabilityLabel}
                </span>
                <input
                  type="text"
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  placeholder={booking.availabilityPlaceholder}
                  className="mt-2 w-full rounded-md border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-silver-200 placeholder:text-charcoal-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-silver-400">
                  {booking.timezoneLabel}
                </span>
                <input
                  type="text"
                  name="timezone"
                  value={form.timezone}
                  onChange={handleChange}
                  placeholder={booking.timezonePlaceholder}
                  className="mt-2 w-full rounded-md border border-charcoal-600 bg-charcoal-900 px-4 py-3 text-silver-200 placeholder:text-charcoal-500 focus:border-silver-500 focus:outline-none focus:ring-1 focus:ring-silver-500"
                />
              </label>
            </div>
            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : booking.submitLabel}
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
