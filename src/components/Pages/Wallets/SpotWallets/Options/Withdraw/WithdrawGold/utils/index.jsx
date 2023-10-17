/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FinalDestination } from '../PlaceFields/FinalDestination';
import { InternationalAirport } from '../PlaceFields/InternationalAirport';
import { SwissCountry } from '../PlaceFields/SwissCountry';

export const places = {
  INTERNATIONAL_AIRPORT: 'airport', // Backend requires one of these strings.
  FINAL_DESTINATION: 'delivery_point',
  SWISS_COUNTRY: 'switzerland',
};
// export const places = {
//   INTERNATIONAL_AIRPORT: 'INTERNATIONAL_AIRPORT',
//   FINAL_DESTINATION: 'FINAL_DESTINATION',
//   SWISS_COUNTRY: 'SWISS_COUNTRY',
// };

export const commentMaxLength = 200;

export const chooseCorrectFields = (place, props) => {
  // Every component below expects props, this way of passing props has been used because
  // we need to make adress string inside this components and get it in the parent component.

  switch (place) {
    case places.FINAL_DESTINATION:
      return <FinalDestination {...props} />;
    case places.INTERNATIONAL_AIRPORT:
      return <InternationalAirport {...props} />;
    case places.SWISS_COUNTRY:
      return <SwissCountry {...props} />;
    default:
      throw new Error('Invalid place');
  }
};

export const getCommissionOfPlace = place => {
  switch (place) {
    case places.INTERNATIONAL_AIRPORT:
      return 375; // Airport fee (eur)
    case places.FINAL_DESTINATION:
      return 475; // Final destination fee (eur)
    case places.SWISS_COUNTRY:
      return 50; // Swiss country (eur)
    default:
      throw new Error('Invalid delivery place');
  }
};

export const calculateAmountCommission = (amount, rateString, comission) => {
  const amountNumber = Number(amount);
  const rate = Number(rateString);

  // amountNumber should be integer
  // rate may be number like 0.7634 or 12.913
  if (
    !Number.isInteger(amountNumber) ||
    Number.isNaN(rate) ||
    !Number.isFinite(comission)
  ) {
    return 0;
  }

  const calculatedTotal = amountNumber * rate; // Get sum to calculate comission
  const result = Number(((calculatedTotal / 100) * comission).toFixed(2));
  return result;
};
