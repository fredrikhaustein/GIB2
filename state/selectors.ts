import { selector } from "recoil";
import { latlngHouseState, latlngMountainState } from "./atoms";

export const getLatLngHouse = selector({
  key: "getLatLngHouse", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const latlng = get(latlngHouseState);
    return latlng;
  },
});

export const getLatLngMountain = selector({
  key: "getLatLngHouse", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const latlng = get(latlngMountainState);
    return latlng;
  },
});
