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

var varsomMeldingArray = [];

const Skredvarsling = () => {
  const latLngMountain = useRecoilValue(latlngMountainState);
  const mountainNameSkred = useRecoilValue(mountainNameState);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(latLngMountain.lat);
        await fetch(
          `https://api01.nve.no/hydrology/forecast/avalanche/v6.0.1/api/AvalancheWarningByCoordinates/Simple/${61.62269}/${8.63236}/1/`
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
    <RecoilRoot>
      <div>
        <h2>Varsling for: {mountainNameState}</h2>
        {item.map((item) => (
          <ol key={item.RegId}>
            Region: {item.RegionName}, Varsel: {item.MainText}
          </ol>
        ))}
      </div>
    </RecoilRoot>
  );
};

export default Skredvarsling;
