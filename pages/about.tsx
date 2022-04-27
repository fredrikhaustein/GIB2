import React from "react";
import Header from "./components/header";
export default function App() {
  return (
    <div className="App">
      <Header />
      <div id="conteneur">
        <h1 id="header"> </h1>
        <div id="contenu">
          <h2>Om oss :</h2>
          <p>Vi gjør det enklere å gå på tur</p>
        </div>
        <div id="contenu">
          <h2>Data :</h2>
          <ul>
            <li>Techniques de management</li>
            <li>Génie électrique</li>
          </ul>
        </div>
        <div id="contenu">
          <h2>Kontaktinfo :</h2>
          <ul>
            <li>Ole Nordman</li>
            <li>Email: ole.norman@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
