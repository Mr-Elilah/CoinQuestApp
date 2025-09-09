import fs from "fs";
import path from "path";

export async function loadMessages(
  locale: string
): Promise<Record<string, string>> {
  const dirPath = path.join(process.cwd(), "locales", locale);

  const files = fs.readdirSync(dirPath);

  const messages = files.reduce<Record<string, string>>((acc, file) => {
    const filePath = path.join(dirPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Record<
      string,
      string
    >;
    return { ...acc, ...content };
  }, {});

  return messages;
}
