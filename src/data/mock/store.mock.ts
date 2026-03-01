import { Store } from "@/src/domain/store";

export const mockStores: Store[] = [
  {
    id: "s1",
    name: "Пятёрочка",
    address: "ул. Ленина, 10",
    region: "Москва",
    location: {
      lat: 55.7558,
      lng: 37.6176,
    },
  },
  {
    id: "s2",
    name: "Магнит",
    address: "ул. Пушкина, 5",
    region: "Москва",
    location: {
      lat: 55.7558,
      lng: 37.6176,
    },
  },
];
