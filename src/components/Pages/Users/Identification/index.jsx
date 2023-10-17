import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import L from 'i18n-react';
import DateInput from './DateInput';
import FileInput from './PictureField';
import Input from './Input';
import StreetInput from './StreetInput';
import types from '../../../../redux/types';
import {
  emailValid,
  transformData,
  checkIsOnlyLetters,
  postalCodeValidatior,
  validateData,
} from '../../../../services/helpers';
import Loader from '../../../Base/Loader';
import {
  userSettingsSelector,
  filesDataSettingsSelector,
} from '../../../../redux/settings/selectors';
import { userSelector } from '../../../../redux/auth/selectors';
import notification from '../../../../services/notification';
import SelectField from './SelectInput';
import KYCAuthSentVerification from '../KYCAuthSentVerification';

const translatePath = 'Notifications.Settings.Identification';
const translateTitle = `${translatePath}.title`;

const init = {
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
  dob: '',
  country: '',
  state: '',
  city: '',
  street: '',
  post_code: '',
  can_withdraw: false,
};

const Identification = () => {
  const dispatch = useDispatch();

  // inputs value
  const [error, setError] = useState({});
  const [errorKYCField, setErrorKYCField] = useState(false);
  const [frame, setFrame] = useState(false);
  const [inputs, setInputs] = useState(init);
  const [message, setMessage] = useState(false)
  const user = useSelector(userSettingsSelector);
  const { countries, languages, verification_status } = useSelector(
    userSelector,
  );
  const documents = useSelector(filesDataSettingsSelector);
  const [kycInformation, setKycInformation] = useState({
    country: '',
    language: '',
  });

  const errorVerificationField = useRef();

  const userStatus = {
    unverified: L.translate('Other.unverified'),
    approved: L.translate('Other.approved'),
    pending: L.translate('Other.pending'),
    rejected: L.translate('Other.rejected', { text: user?.kyc_message }),
  };

  useEffect(() => {
    dispatch({ type: types.GET_IDENTIFICATION_START });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: types.GET_COUNTRIES_IDENTIFICATION_START });
  }, [dispatch]);

  useEffect(() => {
    setInputs({
      ...user.data,
      email: user.email,
    });
  }, [user]);

  // documents
  const handleDocumentChange = e => {
    if (validateData(kycInformation)) {
      console.log(kycInformation);
      setErrorKYCField(false);
      setFrame(true);
      setMessage(false)
      dispatch({
        type: types.POST_KYC_VERIFICATIONS_START,
        payload: kycInformation,
      });
    } else {
      notification({
        type: 'error',
        title: '',
        //message: 'Fill in all the fields',
        message: L.translate(`${translatePath}.error_verification`),
      });
      setErrorKYCField(true);
    }

    // if (document.file) {
    //   dispatch({
    //     type: types.UPDATE_DOCUMENTS_START,
    //     payload: document,
    //   });
    //   return;
    // }

    // dispatch({
    //   type: types.DELETE_DOCUMENTS_START,
    //   payload: document,
    // });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'first_name':
      case 'last_name':
      case 'country':
      case 'state':
        if (checkIsOnlyLetters(value, 0, true)) {
          setInputs(prev => ({ ...prev, [name]: value }));
          setError({});
        }
        return;
      case 'post_code':
        if (postalCodeValidatior(value, true)) {
          setInputs(prev => ({ ...prev, [name]: value }));
          setError({});
        }
        return;
      default:
        break;
    }
    setInputs(prev => ({ ...prev, [name]: value }));
    setError({});
  };

  const handleBirthdeyChange = dob => {
    setInputs({ ...inputs, dob });
    setError({});
  };

  const handleSubmit = e => {
    e.preventDefault();
     
    // generate array with error values
    const empty = Object.entries(inputs).filter(
      input =>
        (typeof input[1] === 'string' && input[1].trim() === '') || // trim empty spaces if input value is string
        input[1] === 0 ||
        input[1] === null, // dont use !input[1] as 'can_withdraw' param can be false / it's ok
    );

    // check for empty string end set error
    if (empty.length) {
      setError(
        empty.reduce((acc, item) => {
          acc[item[0]] = L.translate('Other.required');
          return acc;
        }, {}),
      );
      notification({
        type: 'error',
        title: L.translate(translateTitle),
        message: L.translate(`${translatePath}.error_fields`),
      });
      return;
    }

    if (!emailValid(inputs.email)) {
      setError({ email: L.translate('Other.invalid_email') });
      return;
    }

    if (inputs.dob.split('-').some(num => !+num)) {
      setError({ dob: L.translate('Other.required') });
      return;
    }

    const min = inputs.phone.includes('+') ? 11 : 10;
    const max = inputs.phone.includes('+') ? 14 : 13;
    if (inputs.phone.length < min || inputs.phone.length > max) {
      setError({ phone: L.translate('Other.invalid_phone') });
      return;
    }
    setMessage(true) 
    dispatch({
      type: types.UPDATE_USER_DATA_START,
      payload: {
        city: inputs.city,
        country: inputs.country,
        dob: inputs.dob,
        first_name: inputs.first_name,
        last_name: inputs.last_name,
        phone: inputs.phone.includes('+') ? inputs.phone : `+${inputs.phone}`,
        post_code: inputs.post_code,
        state: inputs.state,
        street: inputs.street,
      },
    });
  };

  const verifietedStatus = status => {
    switch (status) {
      case 'pending':
        return L.translate(
          'UsersPage.Identification.status_verification.pending',
        );
      case 'approved':
        return L.translate(
          'UsersPage.Identification.status_verification.approved',
        );
      default:
        return L.translate(
          'UsersPage.Identification.status_verification.cancelled',
        );
    }
  };

  return (
    <>
      {!user?.id ? (
        <Loader />
      ) : (
        <div className="account-block__main">
          {/* {frame ? (
           frame
          ) : ( */}
          <div className="account-box">
            <p className="account-box__title" />

            <form
              action="#"
              className="setting-verification"
              onSubmit={handleSubmit}
            >
              <div className="set-status">
                <div
                  className={
                    user?.status?.name && user.status.name === 'approved'
                      ? 'profile-status profile-status--type1'
                      : 'profile-status profile-status--type2'
                  }
                >
                  <p className="profile-status__text">
                    {L.translate('UsersPage.Identification.status')}
                  </p>
                  <span className="status-indicate" />
                  <span className="status-hint">
                    <span className="status-hint__icon">
                      <i className="fas fa-info-circle" />
                    </span>
                    <span className="status-reason">
                      <span className="status-reason__text">
                        {user?.status?.name && userStatus[user?.status?.name]}
                      </span>
                    </span>
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="custom-field">
                    <span className="form-label">
                      {L.translate('UsersPage.Identification.first_name')}
                    </span>
                    <Input
                      value={inputs.first_name}
                      onChange={handleChange}
                      name="first_name"
                      className="form-item"
                      placeholder={L.translate(
                        'UsersPage.Identification.first_name',
                      )}
                      error={error}
                      maxLength={200}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-field">
                    <span className="form-label">
                      {L.translate('UsersPage.Identification.last_name')}
                    </span>
                    <Input
                      value={inputs.last_name}
                      onChange={handleChange}
                      name="last_name"
                      className="form-item"
                      placeholder={L.translate(
                        'UsersPage.Identification.last_name',
                      )}
                      error={error}
                      maxLength={200}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-field">
                    <span className="form-label">
                      {L.translate('UsersPage.Identification.country')}
                    </span>
                    <Input
                      value={inputs.country}
                      onChange={handleChange}
                      name="country"
                      className="form-item"
                      placeholder={L.translate(
                        'UsersPage.Identification.country',
                      )}
                      error={error}
                      maxLength={60}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-field">
                    <span className="form-label">
                      {L.translate('UsersPage.Identification.state')}
                    </span>
                    <Input
                      value={inputs.state}
                      onChange={handleChange}
                      name="state"
                      className="form-item"
                      placeholder={L.translate(
                        'UsersPage.Identification.state',
                      )}
                      error={error}
                      maxLength={60}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="custom-field">
                    <span className="form-label">
                      {L.translate('UsersPage.Identification.street_address')}
                    </span>
                    <StreetInput
                      value={inputs.street}
                      onChange={handleChange}
                      name="street"
                      className="form-item form-item--has-icon"
                      placeholder={L.translate(
                        'UsersPage.Identification.street_address',
                      )}
                      error={error}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-field">
                    <span className="form-label">
                      {L.translate('UsersPage.Identification.city')}
                    </span>
                    <Input
                      value={inputs.city}
                      onChange={handleChange}
                      name="city"
                      className="form-item"
                      placeholder={L.translate('UsersPage.Identification.city')}
                      error={error}
                      maxLength={170}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-field">
                    <span className="form-label">
                      {L.translate('UsersPage.Identification.email')}
                    </span>
                    <Input
                      value={inputs.email}
                      onChange={handleChange}
                      name="email"
                      className="form-item"
                      placeholder={L.translate(
                        'UsersPage.Identification.email',
                      )}
                      error={error}
                      maxLength={200}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="row justify-content-between">
                    <div className="col-lg-4">
                      <div className="custom-field">
                        <span className="form-label">
                          {L.translate('UsersPage.Identification.post_code')}
                        </span>
                        <Input
                          value={inputs.post_code}
                          onChange={handleChange}
                          name="post_code"
                          className="form-item"
                          placeholder={L.translate(
                            'UsersPage.Identification.post_code',
                          )}
                          error={error}
                          maxLength={20}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="custom-field">
                        <span className="form-label">
                          {L.translate('UsersPage.Identification.phone')}
                        </span>
                        <div
                          className={
                            error.phone
                              ? 'field-wrap phone-field error'
                              : 'field-wrap phone-field'
                          }
                        >
                          <PhoneInput
                            country="us"
                            value={inputs.phone}
                            name="phone"
                            onChange={phone => {
                              setInputs({ ...inputs, phone });
                              setError({});
                            }}
                          />

                          {error.phone && (
                            <div className="error-text">
                              <p className="error-text__item">{error.phone}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <span className="form-label">
                    {L.translate('UsersPage.Identification.date_of_birth')}
                  </span>
                  <DateInput
                    dob={transformData(inputs.dob, 'YYYY-MM-DD')}
                    onChange={handleBirthdeyChange}
                    error={error}
                  />
                </div>

                <div className="col-12">
                  <div className="form-submit form-submit--type2 justify-content-between">
                    <button className="page-btn">
                      {L.translate('UsersPage.Identification.save')}
                    </button>
                    {/* {user?.status?.name && user.status.name === 'approved' ? (
                    <p className="doc-stasus doc-stasus--verified">Verified</p>
                  ) : (
                    <p className="doc-stasus doc-stasus--unverified">
                      Unverified
                    </p>
                  )} */}
                    {/* <p className="doc-stasus doc-stasus--unverified">
                    Unverified
                  </p> */}
                  </div>
                </div>
                <div className="col-12">
                {message ? (
                     <p className="doc-stasus message-kyc">
                      {L.translate('UsersPage.Identification.message_true')}
                    </p>
                ) : (
                  ''
                )}
                </div>
              
                <div className="col-12">
                  {/* <div className="row justify-content-between"> */}
                  <div className="row">
                    <div className="col-lg-4">
                      <SelectField
                        title={L.translate(
                          'UsersPage.Identification.country_verification',
                        )}
                        selectData={countries}
                        kycInformation={kycInformation}
                        setKycInformation={setKycInformation}
                        fieldName={'country'}
                        selectValue={kycInformation?.country}
                        setErrorKYCField={setErrorKYCField}
                      />
                    </div>
                    <div className="col-lg-4">
                      <SelectField
                        title={L.translate(
                          'UsersPage.Identification.languages_verification',
                        )}
                        selectData={languages}
                        kycInformation={kycInformation}
                        setKycInformation={setKycInformation}
                        fieldName={'language'}
                        selectValue={kycInformation?.language}
                        setErrorKYCField={setErrorKYCField}
                      />
                    </div>
                    <div className="col-lg-4">
                      <span className="form-label">
                        {L.translate(
                          'UsersPage.Identification.status_document',
                        )}
                      </span>
                      <p className="doc-stasus">
                        <span className="form-label">
                          {verifietedStatus(user?.verification_status)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 account-doc-indent account-doc-indent--type2">
                  <div className="row">
                    <div className="col-md-6">
                      {verifietedStatus(user?.verification_status) ===
                      'approved' ? (
                        <KYCAuthSentVerification
                          title={L.translate(
                            'UsersPage.Identification.kyc_message',
                          )}
                        />
                      ) : (
                        <FileInput
                          onChange={handleDocumentChange}
                          document={documents[0]}
                          errorKYCField={errorKYCField}
                          img={'/img/verify1.png'}
                          title={L.translate(
                            'UsersPage.Identification.face_verivication',
                          )}
                          text={L.translate('UsersPage.Identification.text')}
                          errorKYCField={errorKYCField}
                        />
                      )}
                    </div>

                    {/* <div className="col-md-6">
                    <FileInput
                      onChange={handleDocumentChange}
                      document={documents[1]}
                      img={'/img/verify2.png'}
                      title={L.translate(
                        'UsersPage.Identification.document_verification',
                      )}
                      text={L.translate(
                        'UsersPage.Identification.documnet_text',
                      )}
                    />
                  </div> */}
                  </div>
                </div>

                {/* <div className="col-12 account-doc-indent">
                <div className="row align-items-end">
                <div className="row">
                  <div className="col-md-6 load-box--type2">
                    <FileInput
                      onChange={handleDocumentChange}
                      document={documents[2]}
                      img={'/img/verify3.png'}
                      title={L.translate(
                        'UsersPage.Identification.driver_license',
                      )}
                      text={L.translate('UsersPage.Identification.driver_text')}
                    />
                  </div>
                  <div className="col-md-6">
                    <span className="form-label">
                      {L.translate(
                        'UsersPage.Identification.national_identity_card',
                      )}
                    </span>
                    <FileInput
                      onChange={handleDocumentChange}
                      document={documents[2]}
                    />
                  </div>
                </div>
              </div> */}
              </div>

              <div className="row justify-content-center">
                <div className="col-auto" />
              </div>
            </form>
          </div>
          {/* )} */}
        </div>
      )}
    </>
  );
};

export default Identification;
