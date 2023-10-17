/* eslint-disable react/prop-types */
import React from 'react';

export const AirportItem = ({ airport, onClick }) => {
  return (
    <li>
      <button type="button" className="drop-btn" onClick={onClick}>
        {airport.iata_code} - {airport.airport_name}
      </button>
    </li>
  );
};
