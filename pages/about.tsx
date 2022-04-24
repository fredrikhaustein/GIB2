import React from "react";
import Header from "./components/header";
import "./styles.css";
export default function App() {
  return (
    <div className="App">
      <Header />
      <div id="conteneur">
        <h1 id="header"> </h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div id="contenu">
          <h2>Om oss :</h2>
          <p>Vi gjør det enklere å gå på tur</p>
        </div>
        <div id="contenu">
          <h2>Data :</h2>
          <ul>
            <li>Techniques de management</li>
            <li>Génie électrique</li>
            <li>Génie des procédés</li>
            <li>Techniques de commercialisation et de communication</li>
            <li> Génie urbain etenvironnement</li>
            <li>Techniques instrumentales</li>
            <li>Génie mécanique et productique Informatique </li>
            <li>Gestion logistique et transport</li>
            <li>Génie informatique</li>
            <li>Génie biotechnologique </li>
            <li>Organisation et gestion des entreprises</li>
            <li>Techniques comptables Maintenance industrielle</li>
            <li>Génie bio-industriel </li>
            <li>Statistique et informatique industrielle</li>
            <li>Maitrise de l’énergie et énergies renouvelables</li>

            <li> Gestion des ressources humaines</li>
            <li>Animation et gestion touristique</li>
            <li>Métiers du web Réseaux et télécoms</li>
            <li> Agroalimentaire et génie biologique</li>
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
