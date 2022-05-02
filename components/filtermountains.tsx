import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Slider } from "@mui/material";

const AllMountainsQuery = gql`
        query {
                mountains {
                        ogc_fid
                        navn
                        wkb_geometry
                        lat
                        lon
                        h_yde
                }
        }
`;

const arrayOfObjects = [
        { label: "1000m", value: 1000 },
        { label: "1200m", value: 1200 },
        { label: "1400m", value: 1400 },
        { label: "1600m", value: 1600 },
        { label: "1800m", value: 1800 },
        { label: "2000m", value: 2000 },
        { label: "2200m", value: 2200 },
        { label: "2400m", value: 2400 },
];

const icon = L.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
});

function MultipleMarkers({ mountainData, filterValue }) {
        const filteredMountainData = mountainData.mountains.filter(
                (e) => e.h_yde >= filterValue
        );
        console.log(filteredMountainData);

        return filteredMountainData.map((m) => {
                return (
                        <Marker
                                key={m.ogc_fid}
                                position={L.latLng(m.lat, m.lon)}
                                icon={icon}
                        >
                                <Popup>
                                        {m.navn}: {m.h_yde}moh
                                </Popup>
                        </Marker>
                );
        });
}

const MapPageFilter = ({ mountaindata }) => {
        const [sliderValue, setSliderValue] = useState(1600);

        const handleOnChange = (event, value) => {
                setSliderValue(value);
        };

        console.log(sliderValue);

        return (
                <>
                        <MapContainer
                                center={[61.4, 8.46]}
                                zoom={6}
                                scrollWheelZoom={true}
                                style={{ height: "650px" }}
                        >
                                <TileLayer
                                        url="https://api.mapbox.com/styles/v1/iversg/cl2mcx5hv000r15qx782sza31/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaXZlcnNnIiwiYSI6ImNsMm1lank3YzB2eTYzZW5xejJ1NHk0eG0ifQ.n7b3yoDn02vItll-wCKs1w"
                                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
                                />
                                <MultipleMarkers
                                        mountainData={mountaindata}
                                        filterValue={sliderValue}
                                />
                        </MapContainer>
                        <div style={{ width: "800px", marginLeft: "350px" }}>
                                <Slider
                                        defaultValue={1600}
                                        step={200}
                                        marks={arrayOfObjects}
                                        min={1000}
                                        max={2400}
                                        size="medium"
                                        onChange={handleOnChange}
                                />
                        </div>
                </>
        );
};
export default MapPageFilter;
