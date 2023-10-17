import React from 'react';

const Input = ({
  value,
  onChange,
  name,
  error = {},
  className,
  placeholder,
  maxLength = 1000,
  readOnly = false,
}) => (
  <div className={error[name] ? 'field-wrap error' : 'field-wrap'}>
    <input
      value={value || ''}
      onChange={onChange}
      name={name}
      type="text"
      className={className}
      placeholder={placeholder}
      maxLength={maxLength}
      readOnly={readOnly}
    />
    {error[name] && (
      <div className="error-text">
        <p className="error-text__item">{error[name]}</p>
      </div>
    )}
  </div>
);

export default Input;
