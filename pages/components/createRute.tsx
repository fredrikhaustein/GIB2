import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [2, -40],
});

const Routing = ({ sourceCity, destinationCity }) => {
  const map = useMap();

  console.log("Map:", destinationCity);

  useEffect(() => {
    if (!map) return;
    console.log("Useeffect");
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(sourceCity.lat, sourceCity.lng),
        L.latLng(destinationCity.lat, destinationCity.lng),
      ],
      showAlternatives: false,
      addWaypoints: false,
      show: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, sourceCity, destinationCity]);

  return null;
};

export default Routing;
