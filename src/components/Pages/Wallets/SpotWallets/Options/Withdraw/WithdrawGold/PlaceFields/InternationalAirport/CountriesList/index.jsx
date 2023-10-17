/* eslint-disable react/prop-types */
import React from 'react';
import { CountryItem } from './CountryItem';

export const CountriesList = ({ onItemClick, countries }) => {
  return (
    <div className="drop-list drop-list-translate">
      <ul className="drop-list__item">
        {countries.map(country => (
          <CountryItem
            key={country.id}
            countryName={country.name}
            onClick={() => onItemClick(country)}
          />
        ))}
      </ul>
    </div>
  );
};
