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

  console.log("Destination:", destinationCity);
  console.log("source", sourceHouse);

  useEffect(() => {
    if (!map) return;
    if (!sourceCity && !destinationCity) return;

    const routingControl = L.Routing.control({
      waypoints: [
        sourceHouse,
        destinationCity,
        // L.latLng(17.384, 78.4866),
        // L.latLng(12.971, 77.5945),
      ],
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
