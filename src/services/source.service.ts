import { IncomeSource } from "@/src/domain/source";
import { mockIncomeSources } from "@/src/data/mock/source.mock";

export async function getSources(): Promise<IncomeSource[]> {
  // позже: fetch("/api/income")
  return mockIncomeSources;
}
