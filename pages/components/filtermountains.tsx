import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { Mountain } from "../../src/types";
import { Sidebar } from "./sidebar";
import styled from "@emotion/styled";
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import Header from "./header";
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
      <Marker key={m.ogc_fid} position={L.latLng(m.lat, m.lon)} icon={icon}>
        <Popup>
          {m.navn} er {m.h_yde} meter
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
        scrollWheelZoom={false}
        style={{ height: "600px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
