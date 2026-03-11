import type { Metadata } from "next";
import Link from "next/link";
import { isLocale } from "@/lib/i18n";
import { loadMessages } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for North Coaching Performance.",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = isLocale(locale) ? await loadMessages(locale) : null;
  const terms = (messages as { termsPage?: Record<string, string> })?.termsPage;

  if (!terms) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-silver-100">
          Terms of Service
        </h1>
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
        {terms.title}
      </h1>
      <p className="mt-2 text-sm text-silver-500">{terms.lastUpdated}</p>
      <div className="mt-8">
        <p className="text-silver-400 leading-relaxed">{terms.intro}</p>
      </div>
      <Link
        href={`/${locale}`}
        className="mt-10 inline-block text-silver-400 underline-offset-4 hover:text-silver-200 hover:underline"
      >
        ← {terms.backToHome}
      </Link>
    </div>
  );
}
