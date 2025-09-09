import type { Metadata } from "next";

export const metadataUk: Metadata = {
  title: "CoinQuest",
  description:
    "Додаток для обліку доходів і витрат, фінансових цілей та аналізу інвестицій.",
  keywords: ["фінанси", "інвестиції", "бюджет", "облік витрат"],
  authors: [{ name: "Mr.Elijah" }],
  openGraph: {
    title: "CoinQuest",
    description:
      "Додаток, який допомагає крок за кроком досягати фінансової свободи.",
    url: "https://CoinQuest.app",
    siteName: "CoinQuest",
    images: [
      {
        url: "https://CoinQuest.app/preview.png",
        width: 1200,
        height: 630,
        alt: "CoinQuest",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoinQuest",
    description: "Облік витрат, інвестиції та фінансові цілі в одному додатку.",
    images: ["https://CoinQuest.app/preview.png"],
  },
};
