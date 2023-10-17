import React, { useState, useEffect } from 'react';
import L from 'i18n-react';
import { range, addZero } from '../../../../../services/helpers';

const dateToString = date => `${date.year}-${date.month}-${date.day}`;

const DateInput = ({ dob, onChange, error }) => {
  const [birthday, setBirthday] = useState({
    day: '00',
    month: '00',
    year: '0000',
  });

  useEffect(() => {
    if (!dob) return;

    setBirthday({
      day: dob.slice(8, 10),
      month: dob.slice(5, 7),
      year: dob.slice(0, 4),
    });
  }, [dob]);

  const handleChange = ({ target }) => {
    setBirthday({ ...birthday, [target.name]: target.value });
    onChange(dateToString({ ...birthday, [target.name]: target.value }));
  };

  return (
    <div className="row justify-content-between">
      <div className="date-col">
        <div className={error.dob ? 'field-wrap error' : 'field-wrap'}>
          <select
            className="form-item form-item--select"
            name="day"
            value={birthday.day}
            onChange={handleChange}
            placeholder={L.translate('UsersPage.Identification.day')}
          >
            <option value="00">00</option>
            {range(1, 31).map(item => (
              <option key={item} value={addZero(item)}>
                {addZero(item)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="date-col">
        <div className={error.dob ? 'field-wrap error' : 'field-wrap'}>
          <select
            className="form-item form-item--select"
            name="month"
            value={birthday.month}
            onChange={handleChange}
            placeholder={L.translate('UsersPage.Identification.month')}
          >
            <option value="00">00</option>
            {range(1, 12).map(item => (
              <option key={item} value={addZero(item)}>
                {addZero(item)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="date-col">
        <div className={error.dob ? 'field-wrap error' : 'field-wrap'}>
          <select
            className="form-item form-item--select"
            name="year"
            value={birthday.year}
            onChange={handleChange}
            placeholder={L.translate('UsersPage.Identification.year')}
          >
            <option value="0000">0000</option>
            {range(1930, new Date().getFullYear() - 16).map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error.dob && (
        <div className="col-12">
          <div className="error-text">
            <p className="error-text__item">{error.dob}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateInput;
