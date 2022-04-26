import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

const Routing = ({ sourceCity, destinationCity }) => {
  const map = useMap();

  const sourceHouse = sourceCity[0];

  console.log("Map:", destinationCity);

  useEffect(() => {
    if (!map) return;
    if (!sourceCity && !destinationCity) return;

    const routingControl = L.Routing.control({
      waypoints: [sourceHouse, destinationCity],
      routeWhileDragging: true,
      show: true,
      showAlternatives: true,
      addWaypoints: true,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => {
      if (!routingControl) return;
      map.removeControl(routingControl);
    };
  }, [map, sourceCity, destinationCity]);

  return null;
};

export default Routing;
