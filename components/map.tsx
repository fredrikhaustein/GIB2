import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Mountain } from "../graphql/types/Mountain";
import "leaflet/dist/leaflet.css";

const Map = ({ mapData }) => {
        let mapDataArray = mapData.mountains.map((mountain: Mountain) => ({
                key: mountain.ogc_fid,
                name: mountain.navn,
                lat: mountain.lat,
                lon: mountain.lon,
        }));
        let mountain = mapDataArray[1];
        console.log(mountain.lat);
        console.log(mountain.lon);

        return (
                <div>
                        <MapContainer
                                center={[mountain.lat, mountain.lon]}
                                zoom={13}
                                scrollWheelZoom={false}
                                style={{ height: 400, width: "100%" }}
                        >
                                <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[51.505, -0.09]}>
                                        <Popup>
                                                A pretty CSS3 popup. <br />{" "}
                                                Easily customizable.
                                        </Popup>
                                </Marker>
                        </MapContainer>
                </div>
        );
};

export default Map;
