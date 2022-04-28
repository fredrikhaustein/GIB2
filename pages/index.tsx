// /pages/index.tsx
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";

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

export default function Home() {
        const { data, loading, error } = useQuery(AllMountainsQuery);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Oh no... {error.message}</p>;

        return (
                <div>
                        <Head>
                                <title>Awesome Links</title>
                                <link rel="icon" href="/favicon.ico" />
                        </Head>
                        <div className="container mx-auto max-w-5xl my-20">
                                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {data.mountains.map((mountain) => (
                                                <li
                                                        key={mountain.ogc_fid}
                                                        className="shadow  max-w-md  rounded"
                                                >
                                                        {mountain.navn}
                                                </li>
                                        ))}
                                </ul>
                        </div>
                </div>
        );
}
