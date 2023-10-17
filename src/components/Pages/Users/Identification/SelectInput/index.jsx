import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import L from 'i18n-react';
import { checkImageType, toBase64 } from '../../../../../services/helpers';
import notification from '../../../../../services/notification';
import { filesSettingsSelector } from '../../../../../redux/settings/selectors';

const SelectField = ({
  title,
  fieldName,
  selectData,
  kycInformation,
  selectValue,
  setKycInformation,
  setErrorKYCField
}) => {
  
 
  const handleChange = ({target}) =>{   
    setKycInformation(()=>{return {...kycInformation,[fieldName]:target.value}});
    setErrorKYCField(()=>{return false});
  }

  return (
    <div className="select-field">
      <span className="form-label">{title}</span>

      <select
        value={selectValue || ''}
        className="form-item form-item--select"
        onChange={handleChange}
      >
        <option value="" hidden disabled>
        {title}
        </option>
        {selectData?.map(data => (
          <option value={data.short_code} key={data.id}>
            {data.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
