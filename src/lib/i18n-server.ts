import { promises as fs } from "fs";
import path from "path";
import type { Locale, Messages } from "./i18n";

export async function loadMessages(locale: Locale): Promise<Messages> {
  const filePath = path.join(process.cwd(), "messages", `${locale}.json`);
  const file = await fs.readFile(filePath, "utf8");
  return JSON.parse(file) as Messages;
}
