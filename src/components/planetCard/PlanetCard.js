import React from "react";
import styles from "./PlanetCard.module.css";

const PlanetCard = ({ name, population, width }) => (
  <div className={styles.panelCard} style={{ width: width + "%" }}>
    <h4>Planet: {name}</h4>
    <h4>Population: {population}</h4>
  </div>
);

export default PlanetCard;
