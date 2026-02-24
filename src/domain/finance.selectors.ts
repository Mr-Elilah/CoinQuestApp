import { FinanceEntry } from "./finance";
import {
  CatalogCategory,
  CatalogItem,
  FinanceSection,
} from "./finance.catalog";

export function getSectionTotal(
  entries: FinanceEntry[],
  categories: CatalogCategory[],
  items: CatalogItem[],
  section: FinanceSection,
): number {
  const categoryIds = categories
    .filter((c) => c.section === section)
    .map((c) => c.id);

  const itemsIds = items
    .filter((i) => categoryIds.includes(i.categoryId))
    .map((i) => i.id);
  return entries
    .filter((e) => itemsIds.includes(e.itemId))
    .reduce((sum, e) => sum + e.amount, 0);
}
