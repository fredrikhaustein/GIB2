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

export const mountainNameState = atom({
  key: "MountainName",
  default: "",
});

export const circleRadiusState = atom({
  key: "CircleRadiusState",
  default: 0,
});

export const cirlceFilterState = atom({
  key: "CircleFilterState",
  default: false,
});

export const selectedRoutes = atom({
  key: "SelectedRoutes",
  default: [],
});
