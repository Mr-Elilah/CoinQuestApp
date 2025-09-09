import type { Metadata } from "next";
import { metadataRu } from "./ru";
import { metadataEn } from "./en";
import { metadataUk } from "./uk";

type SupportedLocale = "ru" | "en" | "uk";
export function getMetadata(locale: SupportedLocale): Metadata {
  switch (locale) {
    case "en":
      return metadataEn;
    case "uk":
      return metadataUk;
    case "ru":
    default:
      return metadataRu;
  }
}
