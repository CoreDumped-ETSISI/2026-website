import React from "react";
import "./VenAConocernos.css";
import logo from "./../../../assets/icons/core-white-logo.svg";

const VenAConocernos = () => (
  <div className="ven-a-conocernos">
    <img
      src={logo}
      alt="Logo de CORE"
      className="ven-a-conocernos__logo reveal"
      style={{ '--delay': '0.35s' }}
    />
    <h2 className="ven-a-conocernos__title reveal" style={{ '--delay': '0.5s' }}>
      ¡Ven a conocernos!
    </h2>
    <p className="ven-a-conocernos__body reveal" style={{ '--delay': '0.65s' }}>
      Estamos debajo de la rotonda.
    </p>
  </div>
);

export default VenAConocernos;
