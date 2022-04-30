// /pages/index.tsx
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import MapPage from "./mappage";
import Header from "./components/header";
import Link from "next/link";
import { Mountain } from "../src/types";

//Dimensions
const height = "100%";
const width = "100%";

//Colors
const colorA = "rgba(236, 240, 241,.4)";
const colorB = "rgba(236, 240, 241,.0)";

const BaseDiv = styled.div`
        background-size: 200%;
        background-position: 0 50%;
        height: ${height};
        position: fixed;
        top: 0;
        width: ${width};
        pointer-events: "none";
`;

const H1 = styled.h1`
        font-size: 50px;
        margin-top: 200px;
        margin-left: 450px;
`;

const Picture = styled(BaseDiv)`
        background-image: url("https://dynaimage.cdn.cnn.com/cnn/q_auto,w_900,c_fill,g_auto,h_506,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F181128110249-13-norway-skiing-travel.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        z-index: -1;
`;

const GridColums = styled.div`
        display: grid;
        grid-template-columns: 15% 85%;
        background-color: #ffffff;
        height: 700px;
`;

const AllMountainsQuery = gql`
        query {
                mountains {
                        ogc_fid
                        navn
                        wkb_geometry
                        lat
                        lon
                        h_yde
                        route_urls
                }
        }
`;

export default function Home() {
        const { data, loading, error } = useQuery(AllMountainsQuery);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Oh no... {error.message}</p>;

        return (
                <>
                        <Header />
                        <Link href="/mappage" prefetch={false}>
                                <a
                                        style={{
                                                fontSize: "50px",
                                                borderColor: "black",
                                                fontFamily: "fantasy",
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "300px",
                                                borderTop: "groove",
                                                borderBottom: "groove",
                                        }}
                                >
                                        Go to Map
                                </a>
                        </Link>
                        <br />
                        <br />
                        <Link href={{ pathname: "/upload", query: data }}>
                                <a
                                        style={{
                                                fontSize: "50px",
                                                fontFamily: "fantasy",
                                                display: "flex",
                                                justifyContent: "center",
                                                borderTop: "groove",
                                                borderBottom: "groove",
                                                borderTopColor: "black",
                                                borderBottomColor: "black",
                                        }}
                                >
                                        Upload file
                                </a>
                        </Link>
                        <Picture />
                </>
        );
}
/* <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
  {data.mountains.map((mountain) => (
    <li key={mountain.ogc_fid} className="shadow  max-w-md  rounded">
      {mountain.navn}
    </li>
  ))}
</ul> */
