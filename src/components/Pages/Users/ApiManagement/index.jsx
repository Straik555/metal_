import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import L from 'i18n-react';
import types from '../../../../redux/types';
import { openModal } from '../../../Base/Modal';
import ModalCreateKey from './ModalCreateKey';
import ModalDisableKey from './ModalDisableKey';
import ModalDeleteKey from './ModalDeleteKey';
import NothingToShow from '../../../Base/NothingToShow';
import LoaderTable from '../../../Base/Loader/LoaderTable';
import { apiManagemenSettingstSelector } from '../../../../redux/settings/selectors';

const APIManagement = () => {
  const dispatch = useDispatch();
  const { APIkey, loading } = useSelector(apiManagemenSettingstSelector);

  const handleClickCreateKey = () => {
    openModal(() => <ModalCreateKey />);
  };

  const handleClickDeleteKey = APIKey => {
    openModal(() => <ModalDeleteKey APIKey={APIKey} />);
  };

  const handleClickDisableKey = APIKey => {
    openModal(() => <ModalDisableKey APIKey={APIKey} />);
  };

  useEffect(() => {
    dispatch({ type: types.GET_TOKENS_START });
  }, [dispatch]);

  return (
    <>
      <div className="account-block__main">
        <div className="account-box">
          <p className="account-box__title">
            {L.translate('UsersPage.ApiManagement.list_of_api')}
          </p>
          <div className="table-top-action">
            <button
              type="button"
              className="page-btn"
              onClick={handleClickCreateKey}
            >
              <span className="page-btn__inner">
                {L.translate('UsersPage.ApiManagement.add_new_api')}
              </span>
            </button>
          </div>
          <div className="table-box">
            <table className="page-table page-table--sm-transform">
              <thead>
                <tr>
                  <td>
                    <span className="td-title td-title--uppercase">
                      {L.translate('UsersPage.ApiManagement.name')}
                    </span>
                  </td>
                  <td>
                    <span className="td-title td-title--uppercase">
                      {L.translate('UsersPage.ApiManagement.api_key')}
                    </span>
                  </td>
                  <td>
                    <span className="td-title td-title--uppercase">
                      {L.translate('UsersPage.ApiManagement.permissions')}
                    </span>
                  </td>
                  <td className="td-center">
                    <span className="td-title td-title--uppercase">
                      {L.translate('UsersPage.ApiManagement.status')}
                    </span>
                  </td>
                  <td className="td-center">
                    <span className="td-title td-title--uppercase">
                      {L.translate('UsersPage.ApiManagement.action')}
                    </span>
                  </td>
                </tr>
              </thead>
              {(loading && !APIkey.length && <LoaderTable colSpan={7} />) || (
                <tbody>
                  {APIkey.length ? (
                    APIkey.map((APIKey, index) => (
                      <tr data-tr={`API ${index + 1}`} key={APIKey.id}>
                        <td data-label="Name">
                          <p>{APIKey.title}</p>
                        </td>
                        <td data-label="API key">
                          <p className="long-val">{APIKey.token}</p>
                        </td>
                        <td data-label="Permissions">
                          <p className="table-text">
                            {APIKey.is_writeable
                              ? L.translate(
                                  'UsersPage.ApiManagement.read_create',
                                )
                              : L.translate(
                                  'UsersPage.ApiManagement.read_only',
                                )}
                          </p>
                        </td>
                        <td className="td-center" data-label="Status">
                          <p
                            className={`status-label status-label--${
                              APIKey.status ? 'active' : 'disabled'
                            }`}
                          >
                            {APIKey.status
                              ? L.translate('UsersPage.ApiManagement.active')
                              : L.translate('UsersPage.ApiManagement.disabled')}
                          </p>
                        </td>
                        <td className="td-center" data-label="Action">
                          <div className="table-action">
                            <button
                              type="button"
                              className="page-btn page-btn--type2"
                              onClick={() => handleClickDeleteKey(APIKey)}
                            >
                              {L.translate('Global.delete')}
                            </button>
                            <button
                              type="button"
                              className="page-btn page-btn--type4"
                              onClick={() => handleClickDisableKey(APIKey)}
                            >
                              {APIKey.status
                                ? L.translate(
                                    'UsersPage.ApiManagement.disabled_button',
                                  )
                                : L.translate(
                                    'UsersPage.ApiManagement.active_button',
                                  )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <NothingToShow colSpan={5} />
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default APIManagement;
