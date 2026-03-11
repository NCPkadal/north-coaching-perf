import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/contexts/i18n-context";
import { isLocale, type Locale } from "@/lib/i18n";
import { loadMessages } from "@/lib/i18n-server";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "de" }];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    notFound();
  }
  const locale = localeParam as Locale;
  const messages = await loadMessages(locale);

  return (
    <I18nProvider locale={locale} messages={messages}>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
