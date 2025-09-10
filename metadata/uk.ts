import type { Metadata } from "next";

export const metadataUk: Metadata = {
  title: "CoinQuest",
  description:
    "Додаток для обліку доходів і витрат, постановки фінансових цілей та аналізу інвестицій.",
  keywords: ["фінанси", "інвестиції", "бюджет", "гроші", "управління"],
  authors: [{ name: "Mr.Elijah" }],
  openGraph: {
    title: "CoinQuest",
    description:
      "Додаток, що допомагає досягти фінансової свободи крок за кроком.",
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
