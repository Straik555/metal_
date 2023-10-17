/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import types from '../../../../../../../../../redux/types';
import {
  airportsSelector,
  countriesSelector,
} from '../../../../../../../../../redux/wallets/selectors';
import { dropDownArrow } from '../../../../../../../../../styles/img/icons';
import { AirportsList } from './AirportsList';
import { CountriesList } from './CountriesList';
import { countryInitialState, airportInitialState } from './utils';

export const InternationalAirport = ({
  setAdress,
  setAdressError,
  submitEvent,
  setSubmitEvent,
}) => {
  const dispatch = useDispatch();
  const countries = useSelector(countriesSelector);
  const airports = useSelector(airportsSelector);

  const [showCountries, setShowCountries] = useState(false);
  const [country, setCountry] = useState(countryInitialState);

  const [showAirports, setShowAirports] = useState(false);
  const [airport, setAirport] = useState(airportInitialState);

  const translatePath = 'Wallets.Spot.CryptoWithdraw.withdraw_gold';

  const countryHandler = useCallback(selectedCountry => {
    setShowCountries(false);
    setCountry(selectedCountry);
  }, []);

  const airportsHanlder = useCallback(selectedAirport => {
    setShowAirports(false);
    setAirport(selectedAirport);
  }, []);

  useEffect(() => {
    dispatch({
      type: types.GET_COUNTRIES_START,
    });
  }, [dispatch]);

  useEffect(() => {
    if (country.id === countryInitialState.id) return;
    dispatch({
      type: types.GET_AIRPORTS_START,
      countryID: country.id,
    });
    setAirport(airportInitialState);
  }, [country, dispatch]);

  useEffect(() => {
    const isError =
      country.id === countryInitialState.id ||
      airport.id === airportInitialState.id;

    if (isError) setAdressError(true);
    else setAdressError(false);

    const adress = `Country: ${country.name}, Airport name: ${airport.airport_name}, Airport code: ${airport.iata_code}`;
    setAdress(adress);

    return () => {
      setAdress('');
    };
  }, [country, airport, setAdressError, setAdress]);

  useEffect(() => {
    if (submitEvent) {
      setCountry(countryInitialState);
      setAirport(airportInitialState);
      setSubmitEvent(false);
    }
  }, [submitEvent, setSubmitEvent]);

  return (
    <>
      <div className="field">
        <p className="field-label field-label--type2">
          {L.translate(`${translatePath}.select_country`)}
          <span className="required_field"> *</span>
        </p>
        <div className="field-wrap">
          <div className="custom-select active country-select-wrap">
            <button
              type="button"
              className="custom-select__item"
              onClick={() => setShowCountries(prev => !prev)}
            >
              <span>{country.name}</span>
              <span className="custom-select__arrow">{dropDownArrow}</span>
            </button>
            {showCountries && (
              <CountriesList
                onItemClick={countryHandler}
                countries={countries}
              />
            )}
          </div>
        </div>
      </div>

      <div className="field">
        <p className="field-label field-label--type2">
          {L.translate(`${translatePath}.select_airport`)}
          <span className="required_field"> *</span>
        </p>
        <div className="field-wrap">
          <div className="custom-select active">
            <button
              type="button"
              className="custom-select__item"
              onClick={() => setShowAirports(prev => !prev)}
            >
              <span>
                {airport?.iata_code} - {airport?.airport_name}
              </span>
              <span className="custom-select__arrow">{dropDownArrow}</span>
            </button>
            {showAirports && (
              <AirportsList onItemClick={airportsHanlder} airports={airports} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
