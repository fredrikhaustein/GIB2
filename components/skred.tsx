import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { latlngMountainState, mountainNameState } from "../state/atoms";
import React from "react";

interface IvarsomMelding {
        regionNavn: string;
        dangerLevel: string;
        validFrom: string;
        validTo: string;
        publishTime: string;
        text: string;
}

function Skredvarsling(): JSX.Element {
        const latLngMountain = useRecoilValue(latlngMountainState);
        const mountainName = useRecoilValue(mountainNameState);
        const [item, setItem] = useState([]);

        useEffect(() => {
                const fetchData = async () => {
                        try {
                                console.log(latLngMountain.lat);
                                await fetch(
                                        `https://api01.nve.no/hydrology/forecast/avalanche/v6.0.1/api/AvalancheWarningByCoordinates/Simple/${latLngMountain.lat}/${latLngMountain.lng}/1/`
                                )
                                        .then((res) =>
                                                console.log(res + "hello")
                                        )
                                        .then((res) => res.json())
                                        .then((json) => {
                                                setItem(json);
                                        });
                                console.log("Item");
                                console.log(item);
                        } catch (err) {
                                if (err.response) {
                                        console.log(err.response.data);
                                } else {
                                        console.log(`error is ${err.message}`);
                                }
                        }
                };
                fetchData();
        }, [latLngMountain]);

        return (
                <div
                        style={{
                                backgroundColor: "lightblue",
                                height: "712px",
                        }}
                >
                        <a style={{ fontSize: "30px" }}>
                                Varsling for: {mountainName}
                        </a>
                        <>
                                {item.map((item) => (
                                        <ol key={item.RegId}>
                                                <a
                                                        style={{
                                                                fontFamily: "fantasy",
                                                        }}
                                                >
                                                        {item.RegionName}
                                                </a>
                                                <ul>
                                                        FARENIVÅ:{" "}
                                                        {item.DangerLevel}
                                                </ul>
                                                <ul>FRA: {item.ValidFrom}</ul>
                                                <ul>TIL: {item.ValidTo}</ul>
                                                <ul>
                                                        PUBLISERT:{" "}
                                                        {item.PublishTime}
                                                </ul>
                                                <ul>
                                                        VARSLING:{" "}
                                                        {item.MainText}
                                                </ul>
                                        </ol>
                                ))}
                        </>
                </div>
        );
}

export default Skredvarsling;
