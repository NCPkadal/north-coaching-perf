"use client";

import Link from "next/link";
import { useI18n } from "@/contexts/i18n-context";
import { SITE_EMAIL, WHATSAPP_URL } from "@/lib/site-config";

export function Footer() {
  const { locale, copy } = useI18n();
  const footer = copy.footer as Record<string, string>;
  const base = `/${locale}`;
  return (
    <footer
      className="border-t border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm text-slate-600">{footer.tagline}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="text-slate-600 transition-colors hover:text-brand-blue"
          >
            {SITE_EMAIL}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 transition-colors hover:text-brand-blue"
          >
            WhatsApp +33 6 36 98 08 30
          </a>
        </div>
        <nav
          className="mt-4 flex flex-wrap justify-center gap-6 text-sm"
          aria-label="Footer navigation"
        >
          <Link
            href={`${base}/privacy`}
            className="text-slate-600 hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-white"
          >
            {footer.privacy}
          </Link>
          <Link
            href={`${base}/terms`}
            className="text-slate-600 hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-white"
          >
            {footer.terms}
          </Link>
          <Link
            href={`${base}/legal`}
            className="text-slate-600 hover:text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-white"
          >
            {footer.legal}
          </Link>
        </nav>
        <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
