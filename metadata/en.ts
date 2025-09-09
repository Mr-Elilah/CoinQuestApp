import type { Metadata } from "next";

export const metadataEn: Metadata = {
  title: "CoinQuest",
  description:
    "An app for managing income, expenses, financial goals and investment analysis.",
  keywords: ["finance", "investment", "budget", "money management"],
  authors: [{ name: "Mr.Elijah" }],
  openGraph: {
    title: "Financial Ladder",
    description: "An app helping you achieve financial freedom step by step.",
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoinQuest",
    description:
      "Track expenses, investments and financial goals in one place.",
    images: ["https://CoinQuest.app/preview.png"],
  },
};
