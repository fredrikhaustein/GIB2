import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Latlng, Mountain } from "../../src/types";
import { useState } from "react";
import { latLng, LatLngTuple, Point } from "leaflet";
import React from "react";
import styled from "@emotion/styled";
import SearchBar from "./searchBar";
import * as L from "leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import { latlngMountainState, latlngHouseState } from "../../state/atoms";
// import RoutingMachine from "./Routing";
import Routing from "./createRute";

const GridRow = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  outline-color: #474747;
  border-radius: ;
  border-color: black;
`;

const GridColums = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  background-color: #ffffff;
  margin: 10px;
`;

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

  let DefaultIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  const findMountain = (fid: number) => {
    return mapDataArray.find((e) => e.ogc_fid == fid);
  };

  const biggestMountain: Mountain = findMountain(1);

  const [map, setMap] = useState(null);
  const [mountainLatlng, setMountainLatlng] =
    useRecoilState(latlngMountainState);
  const [mountainInfo, setMountainInfo] = useState("");
  const latlngHouse = useRecoilValue(latlngHouseState);
  const latlngMountain = useRecoilValue(latlngMountainState);

  async function handleMapButton(newMountain: Mountain) {
    await map.panTo(latLng(newMountain.lat, newMountain.lon));
  }

  const handleMountainChange = (e) => {
    const newMountain = findMountain(e.target.value);
    handleMapButton(newMountain);
    // setLatLngMarker([newMountain.lat, newMountain.lon]);
    setMountainLatlng(L.latLng(newMountain.lat, newMountain.lon));
    console.log("Her er state mountain" + mountainLatlng);
    setMountainInfo(`${newMountain.navn} er ${newMountain.h_yde} MOH`);
  };

  return (
    <GridRow>
      <GridColums>
        <select onChange={handleMountainChange}>
          {mapDataArray.map((mountain: Mountain) => (
            <option value={mountain.ogc_fid} key={mountain.ogc_fid}>
              {mountain.navn}
            </option>
          ))}
        </select>
        <SearchBar />
      </GridColums>
      <MapContainer
        center={[biggestMountain.lat, biggestMountain.lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*
         *<UpdateMapCenter newMountain={newMountain} />
         */}
        <Marker position={mountainLatlng}>
          <Popup>{mountainInfo}</Popup>
        </Marker>
        <Routing sourceCity={latlngHouse} destinationCity={latlngMountain} />
      </MapContainer>
    </GridRow>
  );
};

export default MountainMap;