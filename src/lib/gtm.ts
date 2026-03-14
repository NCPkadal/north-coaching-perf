/**
 * Push custom events to GTM dataLayer for use in GA4 Event tags.
 * Use these event names in GTM when creating "Google Analytics: Événement GA4" tags.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function pushGtmEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

/** Discovery call form submitted successfully */
export function gtmDiscoveryFormSubmit() {
  pushGtmEvent("discovery_form_submit", { form_name: "booking" });
}

/** Contact form submitted successfully */
export function gtmContactFormSubmit() {
  pushGtmEvent("contact_form_submit", { form_name: "contact" });
}

/** User clicked a main "Book a call" / CTA button */
export function gtmCtaBookingClick(source: string) {
  pushGtmEvent("cta_booking_click", { cta_source: source });
}
