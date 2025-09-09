import type { Metadata } from "next";

export const metadataRu: Metadata = {
  title: "CoinQuest",
  description:
    "Приложение для учета доходов и расходов, постановки финансовых целей и анализа инвестиций.",
  keywords: [
    "финансы",
    "инвестиции",
    "бюджет",
    "учет расходов",
    "финансовая грамотность",
  ],
  authors: [{ name: "Mr.Elijah" }],
  openGraph: {
    title: "CoinQuest",
    description:
      "Приложение, которое помогает достичь финансовой свободы шаг за шагом.",
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
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoinQuest",
    description:
      "Учет расходов, инвестиции и финансовые цели в одном приложении.",
    images: ["https://CoinQuest.app/preview.png"],
  },
};
