import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Mountain } from "../src/types";
import { useState } from "react";
import { latLng } from "leaflet";
import React from "react";

const MountainMap = ({ mapData }) => {
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

        const findMountain = (fid: number) => {
                return mapDataArray.find((e) => e.ogc_fid == fid);
        };

        const biggestMountain: Mountain = findMountain(1);

        const [map, setMap] = useState(null);
        async function handleMapButton(newMountain: Mountain) {
                await map.panTo(latLng(newMountain.lat, newMountain.lon));
        }

        const handleMountainChange = (e) => {
                const newMountain = findMountain(e.target.value);
                handleMapButton(newMountain);
        };

        return (
                <div>
                        <MapContainer
                                center={[
                                        biggestMountain.lat,
                                        biggestMountain.lon,
                                ]}
                                zoom={13}
                                scrollWheelZoom={false}
                                style={{ height: 400, width: "100%" }}
                                whenCreated={setMap}
                        >
                                <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {/*
                                 *<UpdateMapCenter newMountain={newMountain} />
                                 */}
                                <Marker position={[51.505, -0.09]}>
                                        <Popup>
                                                A pretty CSS3 popup. <br />{" "}
                                                Easily customizable.
                                        </Popup>
                                </Marker>
                        </MapContainer>
                        <select onChange={handleMountainChange}>
                                {mapDataArray.map((mountain: Mountain) => (
                                        <option value={mountain.ogc_fid}>
                                                {mountain.navn}
                                        </option>
                                ))}
                        </select>
                </div>
        );
};

export default MountainMap;
