import { Resource } from "@/src/domain/resource";
import { mockResources } from "@/src/data/mock/resource.mock";

export async function getResources(): Promise<Resource[]> {
  // позже: fetch("/api...")
  return mockResources;
}
