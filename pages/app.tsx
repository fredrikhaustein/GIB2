import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { Mountain } from "../src/types";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

const GridColums = styled.div`
        display: grid;
        grid-template-columns: 15% 85%;
        background-color: #ffffff;
`;

const Sidebar = dynamic(
        () => import("./components/sidebar"), // replace '@components/map' with your component's location
        {
                ssr: false, // This line is important. It's what prevents server-side render
                loading: () => (
                        <div
                                style={{
                                        textAlign: "center",
                                        paddingTop: 20,
                                }}
                        >
                                Chargement…
                        </div>
                ),
        }
);

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

const GridRow = styled.div`
        display: grid;
        grid-template-rows: 90% 10%;
        outline-color: #474747;
        border-radius: 5;
        border-color: black;
`;

const AppContainer = styled.div`
        overflow: hidden;
`;

function App() {
        const { data, loading, error } = useQuery(AllMountainsQuery);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Oh no... {error.message}</p>;

        return (
                <BrowserRouter>
                        <AppContainer style={{ height: "700px" }}>
                                <GridColums>
                                        <Sidebar />
                                </GridColums>
                        </AppContainer>
                </BrowserRouter>
        );
}

export default App;
