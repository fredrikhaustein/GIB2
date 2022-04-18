import axios from "axios";
import * as L from "leaflet";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import api from "./api/posts";
import { Autocomplete, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { latlngHouseState } from "../../state/atoms";

const apiAddresse = axios.create({
  baseURL:
    "https://ws.geonorge.no/adresser/v1/sok?side=0&adressetekst=Os&treffPerSide=10&asciiKompatibel=true&utkoordsys=4258",
});

interface Ioptions {
  adressetekst: String;
  kommuneNavn: String;
  lat?: Number;
  lon?: Number;
}
const optionsArray: Ioptions[] = [];

export default function searchBar() {
  const [latlngAdresse, setLatLngAdresse] = useState([]);
  const [houseLatlngState, setHouseLatlngState] =
    useRecoilState(latlngHouseState);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");

  useMemo(() => {
    const fetchAdress = async () => {
      try {
        const response = await api.get(
          `https://ws.geonorge.no/adresser/v1/sok?side=0&treffPerSide=10&asciiKompatibel=true&utkoordsys=4258&sok=${value}`
        );
        const adresser = response.data.adresser;
        console.log("USEMEMO");
        console.log(adresser);
        if (adresser) {
          const latlng = adresser.map((a) =>
            L.latLng(a.representasjonspunkt.lat, a.representasjonspunkt.lon)
          );
          setHouseLatlngState(latlng);
        }
        console.log(houseLatlngState);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(`error is ${err.message}`);
        }
      }
    };
    fetchAdress();
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `https://ws.geonorge.no/adresser/v1/sok?side=0&treffPerSide=10&asciiKompatibel=true&utkoordsys=4258&sok=${inputValue}`
        );
        const adresser = response.data.adresser;
        setOptions(adresser.map((a) => `${a.adressetekst}, ${a.kommunenavn}`));
        console.log("Dette er options " + options);
        console.log("Dette er value " + value);
        console.log("Dette er inputvalue " + inputValue);
        // if (adresser) {
        //   setHouseLatlngState(
        //     adresser.map((a) =>
        //       L.latLng(a.representasjonspunkt.lat, a.representasjonspunkt.lon)
        //     )
        //   );
        //   console.log("Latlng house er " + houseLatlngState);
        // }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(`error is ${err.message}`);
        }
      }
    };
    fetchData();
  }, [setInputValue, inputValue]);

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        sx={{ width: "100%" }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event: any, newValue: string) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} id="textfield" label="Adresse" />
        )}
      />
    </div>
  );
}
