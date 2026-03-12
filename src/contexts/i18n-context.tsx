"use client";

import { createContext, useContext, useEffect } from "react";
import type { Locale } from "@/lib/i18n";

export type Messages = Record<string, unknown>;

type I18nContextValue = {
  locale: Locale;
  copy: Messages;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: Messages;
}) {
  // Keep the <html lang="..."> attribute in sync with the active locale.
  // This helps browsers and translators avoid incorrect auto-translation.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, copy: messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
