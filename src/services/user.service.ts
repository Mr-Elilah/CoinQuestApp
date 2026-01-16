import { User } from "@/src/domain/user";
import { mockUser } from "@/src/data/mock/user.mock";

export async function getCurrentUser(): Promise<User> {
  // сейчас mock
  // потом тут будет fetch("/api/user")
  return mockUser;
}
