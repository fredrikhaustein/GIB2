import dynamic from "next/dynamic";

const Skredvarsling = dynamic(
        () => import("./components/skred"), // replace '@components/map' with your component's location
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

export function Avalanche() {
        return (
                <div style={{ height: "100%" }}>
                        <Skredvarsling />
                </div>
        );
}
export default Avalanche;
