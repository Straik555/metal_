import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import L from 'i18n-react';
import { closeModal } from '../../../../Base/Modal';
import types from '../../../../../redux/types';

const ModalCreateKey = () => {
  const dispatch = useDispatch();
  const [keyData, setKeyData] = useState({
    name: '',
    permission: 0,
    withdraw: 0,
  });
  const [error, setError] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setKeyData({
        ...keyData,
        [name]: value,
      });
      return;
    }
    setKeyData({
      ...keyData,
      [name]: Number(value),
    });
  };

  const handleSubmit = () => {
    if (keyData.name.length < 4) {
      setError(true);
      return;
    }
    setError(false);
    const payload = {
      title: keyData.name,
      is_writeable: keyData.permission,
      is_withdrawable: keyData.withdraw,
    };
    dispatch({ type: types.CREATE_TOKENS_START, payload });
    closeModal();
  };

  return (
    <>
      <div className="theme-modal theme-modal--regular">
        <button type="button" className="close-modal" onClick={closeModal}>
          <i className="fa fa-times" />
        </button>
        <div className="modal-header">
          <p className="modal-subtitle">
            {L.translate('UsersPage.ApiManagement.add_new_api')}
          </p>
        </div>
        <div className="modal-body">
          <div className="modal-field">
            <span className="field-label field-label--type2">
              {L.translate('UsersPage.ApiManagement.key_name')}
            </span>
            <div className="field-wrap">
              <input
                type="text"
                className="form-item"
                placeholder={L.translate('UsersPage.ApiManagement.name')}
                name="name"
                onChange={handleChange}
                maxLength="50"
                minLength="3"
              />
              {error && (
                <div className="error-text">
                  <p className="error-text__item">
                    {L.translate('UsersPage.ApiManagement.name_length')}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="modal-field">
                <span className="field-label field-label--type2">
                  {L.translate('UsersPage.ApiManagement.permission')}
                </span>
                <div className="field-wrap">
                  <div className="modal-radio">
                    <input
                      type="radio"
                      className="radio"
                      name="permission"
                      id="permission1"
                      value="0"
                      onChange={handleChange}
                      checked={keyData.permission === 0}
                    />
                    <label htmlFor="permission1">
                      {L.translate('UsersPage.ApiManagement.read_only')}
                    </label>
                  </div>
                  <div className="modal-radio">
                    <input
                      type="radio"
                      className="radio"
                      name="permission"
                      id="permission2"
                      value="1"
                      onChange={handleChange}
                    />
                    <label htmlFor="permission2">
                      {L.translate('UsersPage.ApiManagement.read_create')}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {/* This part is unnecessarry ib MTC */}
              {/* <div className="modal-field">
                <span className="field-label field-label--type2">
                  {L.translate('UsersPage.ApiManagement.withdraw')}
                </span>
                <div className="field-wrap">
                  <div className="modal-radio">
                    <input
                      type="radio"
                      className="radio"
                      name="withdraw"
                      id="Withdraw1"
                      value="1"
                      onChange={handleChange}
                    />
                    <label htmlFor="Withdraw1">
                      {L.translate('Global.yes')}
                    </label>
                  </div>
                  <div className="modal-radio">
                    <input
                      type="radio"
                      className="radio"
                      name="withdraw"
                      id="Withdraw2"
                      value="0"
                      onChange={handleChange}
                      checked={keyData.withdraw === 0}
                    />
                    <label htmlFor="Withdraw2">
                      {L.translate('Global.no')}
                    </label>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="modal-actions modal-actions--type2">
          <button
            type="button"
            className="page-btn page-btn--type2"
            onClick={closeModal}
          >
            {L.translate('Global.cancel')}
          </button>
          <button type="button" className="page-btn" onClick={handleSubmit}>
            {L.translate('UsersPage.ApiManagement.add_key')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalCreateKey;
