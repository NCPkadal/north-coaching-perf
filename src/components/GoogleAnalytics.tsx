"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, Suspense } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

function sendPageView(path: string) {
  if (typeof window === "undefined" || !GA_ID || !window.gtag) return;
  window.gtag("config", GA_ID, { page_path: path });
}

function AnalyticsInner() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    sendPageView(pathname ?? "/");
  }, [pathname]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsInner />
      </Suspense>
    </>
  );
}
