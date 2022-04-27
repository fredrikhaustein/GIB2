import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { Mountain } from "../src/types";
import { Sidebar } from "./components/sidebar";
import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { RecoilRoot } from "recoil";
import Header from "./components/header";

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

const GridColums = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  background-color: #add8e6;
  height: 100%;
`;

const GridRow = styled.div`
  display:grid
  grid-template-rows: 15% 85%;
`;

export function HomePage() {
  const { data, loading, error } = useQuery(AllMountainsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const mountainNames: string = data.mountains.map((mountain: Mountain) => ({
    mountainName: mountain.navn,
  }));

  const Map = dynamic(
    () => import("./components/map"), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );

  return (
    <div style={{ height: "100%" }}>
      <Header />
      <GridColums>
        <Sidebar />
        <Map mapData={data} />
      </GridColums>
    </div>
  );
}
export default HomePage;
