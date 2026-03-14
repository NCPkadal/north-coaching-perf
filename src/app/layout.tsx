import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const siteName = "North Coaching Performance";
const tagline = "Precision. Direction. Resilience.";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://northcoachingperformance.com";

export const metadata: Metadata = {
  icons: {
    icon: "/brand/logo.png",
  },
  title: {
    default: `${siteName} — ${tagline}`,
    template: `%s | ${siteName}`,
  },
  description:
    "High-performance coaching for athletes and leaders. Evidence-based support across sleep, training, recovery, nutrition, stress management, and monitoring. Switzerland-based.",
  keywords: [
    "performance coaching",
    "athlete coaching",
    "leadership coaching",
    "sports physiotherapy",
    "recovery",
    "Switzerland",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName,
    title: `${siteName} — ${tagline}`,
    description:
      "High-performance coaching for athletes and leaders. Evidence-based, discreet, results-driven.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${tagline}`,
    description: "High-performance coaching for athletes and leaders.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-charcoal-950 text-silver-100 page-bg bg-logo antialiased">
        <GoogleTagManager />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
