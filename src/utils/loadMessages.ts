// utils/loadMessages.ts
import fs from "fs";
import path from "path";
import { DEFAULT_LOCALE } from "@/src/i18n/routing";

export async function loadMessages(
  locale: string
): Promise<Record<string, string>> {
  const dirPath = path.join(process.cwd(), "locales", locale);

  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
   

    console.warn(
      `[loadMessages] locale "${locale}" not found — falling back to "${DEFAULT_LOCALE}"`
    );
    if (locale === DEFAULT_LOCALE) return {};
    return loadMessages(DEFAULT_LOCALE);
  }

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));

  const messages = files.reduce<Record<string, string>>((acc, file) => {
    const filePath = path.join(dirPath, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const content = JSON.parse(raw) as Record<string, string>;
    return { ...acc, ...content };
  }, {});

  return messages;
}
