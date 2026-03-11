import type { Metadata } from "next";
import Link from "next/link";
import { isLocale } from "@/lib/i18n";
import { loadMessages } from "@/lib/i18n-server";
import { SITE_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for North Coaching Performance.",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = isLocale(locale) ? await loadMessages(locale) : null;
  const privacy = (messages as { privacyPage?: Record<string, string> })?.privacyPage;

  if (!privacy) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-silver-100">
          Privacy Policy
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
        {privacy.title}
      </h1>
      <p className="mt-2 text-sm text-silver-500">{privacy.lastUpdated}</p>
      <div className="mt-8 space-y-6 text-silver-400 leading-relaxed">
        <p>{privacy.intro}</p>
        <p>{privacy.noThirdParty}</p>
        <p>
          {privacy.deletionRequest}{" "}
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="text-silver-200 underline underline-offset-2 hover:text-silver-100"
          >
            {SITE_EMAIL}
          </a>
        </p>
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
