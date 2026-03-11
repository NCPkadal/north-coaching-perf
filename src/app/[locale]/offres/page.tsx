import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { isLocale } from "@/lib/i18n";
import { loadMessages } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Offres — Suivi athlétique pilotes de compétition",
  description:
    "Offre de suivi athlétique pour pilotes de compétition par Charles North, kinésithérapeute du sport : diagnostic, suivi avancé et performance premium.",
};

const methodologyPoints = [
  "Un bilan athlétique complet en présentiel (2h, facturé séparément) : mobilité, force, stabilité, endurance spécifique, asymétries.",
  "Une planification mensuelle personnalisée de la préparation athlétique.",
  "Un suivi hebdomadaire avec adaptation selon la charge, la fatigue et les déplacements.",
  "Une communication fluide via un groupe WhatsApp dédié (pilote + coach + manager).",
  "Un débrief mensuel en visio (bilan + planification suivante).",
];

const offers = [
  {
    name: "Diagnostic & Planification",
    objective: "Poser les bases de la performance.",
    includes: [
      "Analyse des besoins et création d'un plan d'entraînement mensuel personnalisé",
      "Débrief mensuel en visio pour ajuster les priorités",
    ],
    price: "300 € / mois / pilote",
    note: "Bilan initial : 180 € (2h) — non inclus",
  },
  {
    name: "Suivi Avancé",
    objective:
      "Assurer un suivi régulier et des adaptations précises tout au long de la saison.",
    includes: [
      "Planification mensuelle individualisée",
      "Ajustements hebdomadaires en fonction de la charge et du calendrier",
      "Communication directe via groupe WhatsApp",
      "Débrief mensuel approfondi en visio",
    ],
    price: "450 € / mois / pilote",
    note: "Bilan initial : 180 € (2h) — non inclus",
  },
  {
    name: "Performance Premium",
    objective:
      "Offrir un encadrement complet et prioritaire, au plus proche des exigences du haut niveau.",
    includes: [
      "Planification et suivi entièrement individualisés, réévalués chaque semaine",
      "Communication continue et prioritaire (WhatsApp + visio à la demande)",
      "Débrief complet toutes les 2 semaines (visio 30 min)",
      "Analyse des données physiques et adaptation en temps réel",
    ],
    price: "650 € / mois / pilote",
    note: "Bilan initial : 180 € (2h) — non inclus",
  },
];

export default async function OffresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const base = `/${locale}`;
  const messages = isLocale(locale) ? await loadMessages(locale) : null;
  const offersCopy = (messages as { offers?: { premium?: { raceWeekendBullet?: string }; ctaBook?: string; ctaProject?: string } })?.offers;
  const raceWeekendBullet = offersCopy?.premium?.raceWeekendBullet ?? null;
  const ctaBook = offersCopy?.ctaBook ?? "Réserver un appel";
  const ctaProject = offersCopy?.ctaProject ?? "Parler de votre projet";

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
      <section aria-labelledby="offres-heading" className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="shrink-0">
          <Image
            src="/brand/logo.png"
            alt="North Coaching Performance"
            width={96}
            height={96}
            className="h-20 w-20 rounded-full border border-charcoal-700 bg-charcoal-900/60 object-contain shadow-sm"
          />
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-silver-500">
            Suivi athlétique · Pilotes
          </div>
          <h1
            id="offres-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-silver-100 sm:text-4xl"
          >
            Offre de suivi athlétique – pilotes de compétition
          </h1>
          <p className="mt-3 text-silver-400">
            Proposée par Charles North – Kinésithérapeute du sport
          </p>
          <p className="mt-6 max-w-3xl text-silver-300">
            Optimiser la performance physique et la longévité des pilotes grâce à
            une approche individualisée, structurée et réactive, centrée sur la
            préparation athlétique, la prévention des blessures et la gestion de
            la charge de travail.
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-charcoal-700 bg-charcoal-900/60 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-silver-100">
            Méthodologie
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-silver-300">
            {methodologyPoints.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-silver-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="formules-heading">
        <h2
          id="formules-heading"
          className="text-xl font-semibold text-silver-100 sm:text-2xl"
        >
          Formules
        </h2>
        <p className="mt-3 text-sm text-silver-400">
          Trois niveaux d&apos;accompagnement, selon le degré d&apos;autonomie du pilote
          et l&apos;intensité de la saison.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {offers.map((offer, offerIndex) => (
            <article
              key={offer.name}
              className="flex h-full flex-col rounded-xl border border-charcoal-700 bg-charcoal-900/60 p-6 shadow-sm"
            >
              <header>
                <h3 className="text-lg font-semibold text-silver-100">
                  {offer.name}
                </h3>
                <p className="mt-2 text-sm text-silver-400">
                  {offer.objective}
                </p>
              </header>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-silver-300">
                {[
                  ...offer.includes,
                  ...(raceWeekendBullet && offerIndex === 2 ? [raceWeekendBullet] : []),
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-silver-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-base font-semibold text-silver-100">
                  {offer.price}
                </p>
                <p className="mt-1 text-xs text-silver-500">{offer.note}</p>
              </div>
              <div className="mt-6">
                <Button asChild className="w-full transition-transform duration-200 hover:scale-[1.02]">
                  <Link href={`${base}/#contact`}>{ctaBook}</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-charcoal-800 pt-10">
        <h2 className="text-lg font-semibold text-silver-100">
          Évolution de l&apos;offre
        </h2>
        <p className="mt-3 text-sm text-silver-400">
          À l&apos;issue de la certification Hintsa Performance, l&apos;accompagnement
          intégrera également :
        </p>
        <ul className="mt-4 space-y-2 text-sm text-silver-300">
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-silver-400" />
            <span>Le suivi mental et les routines cognitives</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-silver-400" />
            <span>Le coaching nutritionnel</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-silver-400" />
            <span>Le suivi du sommeil et de la récupération</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-silver-400" />
            <span>
              Une approche complète de la performance globale (Hintsa &quot;Circle of
              Better Life&quot;)
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-16 rounded-xl border border-charcoal-700 bg-charcoal-950/70 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-silver-100">
          Contact & informations
        </h2>
        <p className="mt-3 text-sm text-silver-300">
          Charles North — Kinésithérapeute du sport — Préparateur athlétique
        </p>
        <div className="mt-4 space-y-1 text-sm text-silver-300">
          <p>
            Email :{" "}
            <a
              href="mailto:northcoachingperf@gmail.com"
              className="underline underline-offset-4 hover:text-silver-100"
            >
              northcoachingperf@gmail.com
            </a>
          </p>
          <p>
            Téléphone :{" "}
            <a
              href="tel:+33636980830"
              className="underline underline-offset-4 hover:text-silver-100"
            >
              +33 6 36 98 08 30
            </a>
          </p>
        </div>
        <p className="mt-4 text-xs text-silver-500">
          Proposition commerciale à titre indicatif — facturation via
          micro-entreprise dès enregistrement (SIRET à venir)
        </p>
        <div className="mt-6">
          <Button asChild variant="secondary" className="transition-transform duration-200 hover:scale-[1.02]">
            <Link href={`${base}/#contact`}>{ctaProject}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
