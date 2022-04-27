import { selector } from "recoil";
import {
  latlngHouseState,
  latlngMountainState,
  mountainNameState,
} from "./atoms";

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

export const getMountainName = selector({
  key: "getMountainName", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const name = get(mountainNameState);
    return name;
  },
});
