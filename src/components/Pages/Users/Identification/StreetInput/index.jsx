import React from 'react';

const StreetInput = ({
  value,
  onChange,
  name,
  error = {},
  className,
  placeholder,
}) => {
  return (
    <>
      <div className={error[name] ? 'field-wrap error' : 'field-wrap'}>
        <input
          value={value || ''}
          onChange={onChange}
          name={name}
          type="text"
          className={error ? `${className} error` : className}
          placeholder={placeholder}
          maxLength={125}
        />

        <span className="field-icon field-icon--left">
          <i className="fas fa-map-marker-alt" />
        </span>
      </div>

      {error[name] && (
        <div className="error-text">
          <p className="error-text__item">{error[name]}</p>
        </div>
      )}
    </>
  );
};

export default StreetInput;
