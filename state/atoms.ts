import { atom } from "recoil";
import * as L from "leaflet";

export const latlngHouseState = atom({
  key: "LatLngHouse", // unique ID (with respect to other atoms/selectors)
  default: L.latLng(0, 0), // default value (aka initial value)
});

export const latlngMountainState = atom({
  key: "LatLngMountain", // unique ID (with respect to other atoms/selectors)
  default: L.latLng(0, 0), // default value (aka initial value)
});
