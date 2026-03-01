import { Location } from "./location";

export interface User {
  id: string;
  name: string;
  age: number;
  avatarUrl: string;
  profession: string;

  birthPlace?: string;
  currentLocation?: string;
  workplace?: string;

  homeLocation?: Location;
}
