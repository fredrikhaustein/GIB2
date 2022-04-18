import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Latlng, Mountain } from "../../src/types";
import { useState } from "react";
import { latLng, LatLngTuple } from "leaflet";
import React from "react";
import styled from "@emotion/styled";
import SearchBar from "./searchBar";
import * as L from "leaflet";
import CreateRute from "./createRute";
import RoutingMachine from "./Routing";

const GridRow = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  outline-color: #474747;
  border-radius: ;
  border-color: black;
  height: 700px;
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

  // L.Marker.prototype.options.icon = L.icon({
  //   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  //   iconSize: [25, 41],
  //   iconAnchor: [10, 41],
  //   popupAnchor: [2, -40],
  // });

  let DefaultIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const [map, setMap] = useState(null);
  const [latlng, setlatlng] = useState(L.latLng(10, 10));
  // const [mountainLatlngState, setMountainLatlngState] =
  //   useRecoilState(latlngMountainState);
  const [latlngMarker, setLatLngMarker] = useState<LatLngTuple>([50, 10]);
  const [mountainInfo, setMountainInfo] = useState("");
  async function handleMapButton() {
    await map.panTo(latLng(10, 12));
  }
  const findMountain = (fid: number) => {
    const mountain = mapDataArray.find((e) => e.ogc_fid == fid);
    setlatlng(L.latLng(mountain.lat, mountain.lon));
    return mountain;
  };

  const biggestMountain: Mountain = findMountain(1);

  const handleMountainChange = (e) => {
    const newMountain = findMountain(e.target.value);
    handleMapButton();
    setLatLngMarker([newMountain.lat, newMountain.lon]);
    setMountainInfo(`${newMountain.navn} er ${newMountain.h_yde} MOH`);
  };

  return (
    <GridRow>
      <GridColums>
        <select onChange={handleMountainChange}>
          {mapDataArray.map((mountain: Mountain) => (
            <option value={mountain.ogc_fid}>{mountain.navn}</option>
          ))}
        </select>
        <SearchBar />
      </GridColums>
      {/* <Button>heheh</Button> */}
      <MapContainer
        center={[biggestMountain.lat, biggestMountain.lon]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
        />
        {/*
         *<UpdateMapCenter newMountain={newMountain} />
         */}
        <Marker position={latlngMarker}>
          <Popup>{mountainInfo}</Popup>
        </Marker>
        <RoutingMachine />
      </MapContainer>
    </GridRow>
  );
};

export default MountainMap;
