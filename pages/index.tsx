// /pages/index.tsx
import dynamic from "next/dynamic";

function HomePage() {
        const Map = dynamic( // Use next/dynamic and avoid server-side rende
                () => import("../components/map"), 
                { ssr: false } 
        );
        return <Map />;
}

export default HomePage;
