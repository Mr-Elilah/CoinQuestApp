import { Achievement } from "@/src/domain/achievement";
import { mockAchievements } from "@/src/data/mock/achievement.mock";

export async function getUserAchievements(): Promise<Achievement[]> {
  // позже: fetch("/api/achievements")
  return mockAchievements;
}
