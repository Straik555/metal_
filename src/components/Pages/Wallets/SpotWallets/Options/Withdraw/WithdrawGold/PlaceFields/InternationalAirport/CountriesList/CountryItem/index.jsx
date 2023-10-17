/* eslint-disable react/prop-types */
import React from 'react';

export const CountryItem = ({ countryName, onClick }) => {
  return (
    <li>
      <button type="button" className="drop-btn" onClick={onClick}>
        {countryName}
      </button>
    </li>
  );
};
