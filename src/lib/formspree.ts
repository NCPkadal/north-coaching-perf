/**
 * Formspree integration. Create two forms at https://formspree.io and add the IDs to .env.local
 */
const FORMSPREE_BOOKING_ID = process.env.NEXT_PUBLIC_FORMSPREE_BOOKING_ID ?? "";
const FORMSPREE_CONTACT_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID ?? "";

export function getBookingFormEndpoint(): string | null {
  return FORMSPREE_BOOKING_ID ? `https://formspree.io/f/${FORMSPREE_BOOKING_ID}` : null;
}

export function getContactFormEndpoint(): string | null {
  return FORMSPREE_CONTACT_ID ? `https://formspree.io/f/${FORMSPREE_CONTACT_ID}` : null;
}

export async function submitToFormspree(
  endpoint: string,
  data: Record<string, string>
): Promise<{ ok: boolean }> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return { ok: res.ok };
}
