// /pages/index.tsx
import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import Header from "./components/header";
import Link from "next/link";

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
        background-image: url("https://live.staticflickr.com/65535/52042405883_d02d07df78_k.jpg");
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
                                                fontFamily: "unset",
                                                display: "flex",
                                                justifyContent: "center",
                                                marginTop: "250px",
                                                borderTop: "groove",
                                                borderBottom: "groove",
                                        }}
                                >
                                        Go to Map
                                </a>
                        </Link>
                        <br />
                        <Link href={{ pathname: "/upload", query: data }}>
                                <a
                                        style={{
                                                fontSize: "50px",
                                                fontFamily: "unset",
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
