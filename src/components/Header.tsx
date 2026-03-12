"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n-context";
import { locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LOGO_SRC: string | null = "/brand/logo.png";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { locale, copy } = useI18n();
  const site = copy.site as { name: string };
  const nav = copy.nav as Record<string, string>;

  const base = `/${locale}`;
  const navLinks = [
    { href: base, label: nav.home },
    { href: `${base}/offres`, label: nav.offers },
    { href: `${base}/#about`, label: nav.about },
    { href: `${base}/#programs`, label: nav.programs },
    { href: `${base}/#contact`, label: nav.contact },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-charcoal-800 bg-charcoal-950/80 backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={base}
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
          aria-label={`${site.name} — Home`}
        >
          {LOGO_SRC ? (
            <Image
              src={LOGO_SRC}
              alt=""
              width={36}
              height={36}
              className="h-9 w-auto"
            />
          ) : (
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-charcoal-600 bg-charcoal-800 text-silver-400",
                "text-xs font-semibold tracking-wider"
              )}
              aria-hidden
            >
              NCP
            </div>
          )}
          <span className="hidden font-semibold tracking-tight text-silver-200 sm:inline">
            {site.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-silver-400 transition-colors hover:bg-charcoal-800 hover:text-silver-200 focus-visible:bg-charcoal-800 focus-visible:text-silver-200"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link href={`${base}/#contact`}>{nav.booking}</Link>
          </Button>
          <div className="ml-4 flex items-center gap-1 text-xs text-silver-500">
            {locales.map((code) => (
              <Link
                key={code}
                href={pathname.replace(/^\/[a-z]{2}(\/|$)/, `/${code}$1`) || `/${code}`}
                className={cn(
                  "rounded px-2 py-1 uppercase tracking-wide transition-colors",
                  code === locale
                    ? "bg-charcoal-800 text-silver-100"
                    : "hover:bg-charcoal-800 hover:text-silver-100"
                )}
              >
                {code}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-charcoal-950/90 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col gap-4 border-l border-charcoal-700 bg-charcoal-950/95 backdrop-blur-md p-6 md:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-silver-200 hover:bg-charcoal-800"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link
                    href={`${base}/#contact`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {nav.booking}
                  </Link>
                </Button>
                <div className="mt-4 flex gap-2 text-xs text-silver-500">
                  {locales.map((code) => (
                    <Link
                      key={code}
                      href={pathname.replace(/^\/[a-z]{2}(\/|$)/, `/${code}$1`) || `/${code}`}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex-1 rounded px-2 py-1 text-center uppercase tracking-wide border border-charcoal-700",
                        code === locale
                          ? "bg-charcoal-800 text-silver-100"
                          : "bg-charcoal-900 hover:bg-charcoal-800"
                      )}
                    >
                      {code}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
