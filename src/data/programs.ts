/**
 * Programs / offers data model.
 * Edit tiers, copy, and pricing here. Prices are placeholders.
 */

export type ProgramTierId = "essential" | "performance" | "elite" | "custom";

export interface ProgramTier {
  id: ProgramTierId;
  name: string;
  description: string;
  whoItsFor: string;
  whatsIncluded: string[];
  expectedOutcomes: string[];
  priceLabel: string; // e.g. "On request" or "Starting at CHF 500/month"
  featured?: boolean;
}

export const programTiers: ProgramTier[] = [
  {
    id: "essential",
    name: "Athlete Performance",
    description: "Remote support for athletes and leaders who want structure and accountability without in-person commitment.",
    whoItsFor: "Athletes and leaders who prefer remote coaching and want a clear plan with weekly touchpoints.",
    whatsIncluded: [
      "Monthly plan with training and recovery focus",
      "Custom training program",
      "Weekly check-in",
      "Messaging support",
    ],
    expectedOutcomes: [
      "Clear roadmap and accountability",
      "Improved consistency in training and recovery",
      "Baseline habits for sleep and stress",
    ],
    priceLabel: "On request",
  },
  {
    id: "performance",
    name: "Advanced Athlete",
    description: "Hybrid support with more frequent contact and optional in-person assessment.",
    whoItsFor: "Those who want closer guidance, data visibility, and the option to meet in person for assessment.",
    whatsIncluded: [
      "Everything in Essential",
      "Biweekly video calls",
      "More frequent updates and adjustments",
      "Monitoring dashboard",
      "Optional in-person assessment",
    ],
    expectedOutcomes: [
      "Faster iteration on plan",
      "Deeper insight into load and recovery",
      "Stronger alignment with goals",
    ],
    priceLabel: "Starting at CHF 800/month",
    featured: true,
  },
  {
    id: "elite",
    name: "Motorsport Performance",
    description: "White-glove support for athletes and leaders who demand the highest level of partnership.",
    whoItsFor: "Elite athletes and executives who need priority access, travel support, and concierge-level coordination.",
    whatsIncluded: [
      "Everything in Performance",
      "Highest touch and priority response",
      "Travel and race-weekend options",
      "Concierge-level support and coordination",
    ],
    expectedOutcomes: [
      "Peak readiness when it matters",
      "Seamless support across locations",
      "Partnership that scales with your calendar",
    ],
    priceLabel: "On request",
  },
  {
    id: "custom",
    name: "Executive Performance",
    description: "Tailored programs for teams and organizations.",
    whoItsFor: "Teams, clubs, and organizations seeking bespoke performance and recovery programs.",
    whatsIncluded: ["Scoped to your needs"],
    expectedOutcomes: ["Alignment with organizational goals", "Scalable, measurable outcomes"],
    priceLabel: "On request",
  },
];

export const programFaqs: { question: string; answer: string }[] = [
  {
    question: "How long is the typical engagement?",
    answer:
      "Most clients start with a 3–6 month commitment. We can discuss shorter or longer terms based on your goals.",
  },
  {
    question: "Do you work with athletes in team sports?",
    answer:
      "Yes. We work with athletes across sports—individual and team—and with leaders in high-demand roles.",
  },
  {
    question: "Is everything confidential?",
    answer:
      "Absolutely. Discretion is core to how we operate. Your data and conversations stay between you and NCP.",
  },
  {
    question: "What does the Discovery Call involve?",
    answer:
      "A 30–45 minute video call to understand your goals, context, and fit. No obligation—just a clear next step if we both see value.",
  },
];
