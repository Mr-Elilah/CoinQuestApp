import { Location } from "./location";

export interface Store {
  id: string;
  name: string;
  address: string;
  region: string;
  location: Location;
}
