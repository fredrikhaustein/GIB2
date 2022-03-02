import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import api from "./api/posts";
import { Autocomplete, TextField } from "@mui/material";

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
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<String | null>(null);

  const handleSelect = () => {};

  useMemo(() => {
    const fetchAdress = async () => {
      try {
        const response = await api.get(
          `https://ws.geonorge.no/adresser/v1/sok?side=0&treffPerSide=10&asciiKompatibel=true&utkoordsys=4258&sok=${value}`
        );
        const adresser = response.data.adresser;
        setLatLngAdresse(
          adresser.map((a) => [
            a.representasjonspunkt.lat,
            a.representasjonspunkt.lon,
          ])
        );
        console.log("Dette er latlong " + latlngAdresse);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(`error is ${err.message}`);
        }
      }
    };
    fetchAdress();
  }, [setValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `https://ws.geonorge.no/adresser/v1/sok?side=0&treffPerSide=10&asciiKompatibel=true&utkoordsys=4258&sok=${inputValue}`
        );
        const adresser = response.data.adresser;
        //console.log("Dette er addresse " + adresser);
        setOptions(adresser.map((a) => `${a.adressetekst} ${a.kommunenavn}`));
        console.log("Dette er options " + options);
        console.log("Dette er value " + value);
        console.log("Dette er inputvalue " + inputValue);
        setLatLngAdresse(
          adresser.map((a) => [
            a.representasjonspunkt.lat,
            a.representasjonspunkt.lon,
          ])
        );
        console.log(latlngAdresse);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(`error is ${err.message}`);
        }
      }
    };
    fetchData();
  }, [setInputValue, setOptions, inputValue]);

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
        onChange={(event: any, newValue: String | null) => {
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
