export const locales = ["en", "fr", "de"] as const;
export type Locale = (typeof locales)[number];

export type Messages = Record<string, unknown>;

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value as Locale);
}

export function createTranslator(messages: Messages) {
  return (key: string): string => {
    const segments = key.split(".");
    let current: any = messages;
    for (const segment of segments) {
      if (current && Object.prototype.hasOwnProperty.call(current, segment)) {
        current = current[segment];
      } else {
        return key;
      }
    }
    return typeof current === "string" ? current : key;
  };
}

