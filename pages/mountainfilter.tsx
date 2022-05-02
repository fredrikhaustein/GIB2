import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
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
        grid-template-columns: 0.1% 99.9%;
        background-color: #add8e6;
        height: 600px;
`;

const GridRow = styled.div`
  display:grid
  grid-template-rows: 5% 95%;
`;

const Map = dynamic(
        () => import("../components/filtermountains"), // replace '@components/map' with your component's location
        { ssr: false } // This line is important. It's what prevents server-side render
);

export function HomePage() {
        const { data, loading, error } = useQuery(AllMountainsQuery);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Oh no... {error.message}</p>;
        //   const mountainsdata: Mountain = data.mountains.map((mountain: Mountain) => ({
        //     ogc_fid: mountain.ogc_fid,
        //     h_yde: mountain.h_yde,
        //     lat: mountain.lat,
        //     lon: mountain.lon,
        //     navn: mountain.navn,
        //     wkb_geometry: mountain.wkb_geometry,
        //   }));
        //   console.log(mountainsdata);

        return (
                <div style={{ height: "600px" }}>
                        <Header />
                        <GridColums>
                                <div style={{ height: "600px" }} />
                                <Map mountaindata={data} />
                        </GridColums>
                </div>
        );
}
export default HomePage;
