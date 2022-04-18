import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { latlngHouseState, latlngMountainState } from "../../state/atoms";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

const createRoutineMachineLayer: any = (props) => {
  const latlngHouse = useRecoilValue(latlngHouseState);
  const latlngMountain = useRecoilValue(latlngMountainState);

  useEffect(() => {
    if (!latlngHouse || !latlngMountain) return;
    const instance = L.Routing.control({
      waypoints: [
        // L.latLng(63.40427593395422, 10.402082984735312),
        // L.latLng(61.651164062, 8.552664456),
        L.latLng(latlngHouse.lat, latlngHouse.lng),
        L.latLng(latlngMountain.lat, latlngMountain.lng),
      ],

      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      fitSelectedRoutes: true,
      showAlternatives: false,
    });
    return () => {
      instance;
    };
  }, [latlngHouse]);
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
