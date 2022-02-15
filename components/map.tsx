import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Mountain } from "../src/types";

const Map = ({ mapData }) => {
        let mapDataArray: Array<Mountain> = mapData.mountains.map(
                (mountain: Mountain) => ({
                        ogc_fid: mountain.ogc_fid,
                        h_yde: mountain.h_yde,
                        lat: mountain.lat,
                        lon: mountain.lon,
                        navn: mountain.navn,
                        wkb_geometry: mountain.wkb_geometry,
                })
        );
        const mountain: Mountain = mapDataArray.find(
                (e) => e.navn == "Snøhetta"
        );
        console.log(mountain);
        //let mountain = mapDataArray.key(1);
        //console.log(mountain.lat);
        //console.log(mountain.lon);

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