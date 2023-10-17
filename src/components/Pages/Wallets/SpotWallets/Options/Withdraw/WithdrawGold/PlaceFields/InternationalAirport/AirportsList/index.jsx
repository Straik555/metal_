/* eslint-disable react/prop-types */
import React from 'react';
import { AirportItem } from './AirportItem';

export const AirportsList = ({ onItemClick, airports }) => {
  return (
    <div className="drop-list drop-list-translate">
      <ul className="drop-list__item">
        {airports.map(airport => (
          <AirportItem
            key={airport.id}
            airport={airport}
            onClick={() => onItemClick(airport)}
          />
        ))}
      </ul>
    </div>
  );
};
