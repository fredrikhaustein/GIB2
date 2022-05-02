import axios from "axios";

export default axios.create({
        baseURL: "https://ws.geonorge.no/adresser/v1/sok?side=0&sok=Sollia&treffPerSide=10&asciiKompatibel=true&utkoordsys=4258",
});
