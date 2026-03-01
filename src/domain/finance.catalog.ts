export type FinanceSection = "income" | "expense" | "asset" | "liability";

export interface CatalogCategory {
  id: string;
  section: FinanceSection;
  name: string;
}

export interface CatalogItem {
  id: string;
  categoryId: string;
  name: string;
  unit?: string;
}
