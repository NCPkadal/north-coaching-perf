import type { Metadata } from "next";
import Link from "next/link";
import { isLocale } from "@/lib/i18n";
import { loadMessages } from "@/lib/i18n-server";
import { SITE_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal information — North Coaching Performance.",
};

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = isLocale(locale) ? await loadMessages(locale) : null;
  const legal = (messages as { legal?: Record<string, string> })?.legal;

  if (!legal) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-silver-100">Legal</h1>
        <Link
          href={`/${locale}`}
          className="mt-10 inline-block text-silver-400 underline-offset-4 hover:text-silver-200 hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-silver-100">
        {legal.pageTitle}
      </h1>
      <div className="mt-8 space-y-4 text-silver-400">
        <p className="text-lg font-medium text-silver-300">{legal.siteName}</p>
        <p>{legal.name}</p>
        <p>{legal.role}</p>
        <p>
          Email :{" "}
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="text-silver-200 underline underline-offset-2 hover:text-silver-100"
          >
            {legal.email}
          </a>
        </p>
        <p className="text-sm text-silver-500">{legal.registrationStatus}</p>
      </div>
      <Link
        href={`/${locale}`}
        className="mt-10 inline-block text-silver-400 underline-offset-4 hover:text-silver-200 hover:underline"
      >
        ← Back to home
      </Link>
    </div>
  );
}
