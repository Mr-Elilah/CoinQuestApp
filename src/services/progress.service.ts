import { Progress } from "../domain/progress";
import { mockProgress } from "../data/mock/progress.mock";

export async function getUserProgress(): Promise<Progress> {
  return mockProgress;
}
