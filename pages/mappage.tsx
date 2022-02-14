import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { Mountain } from "../graphql/types";

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

function HomePage() {
        const { data, loading, error } = useQuery(AllMountainsQuery);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Oh no... {error.message}</p>;

        const Map = dynamic(
                () => import("components/map"), // replace '@components/map' with your component's location
                { ssr: false } // This line is important. It's what prevents server-side render
        );
        return <Map mapData={data} />;
}
export default HomePage;
