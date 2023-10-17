/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import { copyAdressIcon, tipsLampIcon } from '../CryptoDepositIcons';
import {
  depositAddressSelector,
  loadingAddressSelector,
} from '../../../../../../../redux/wallets/selectors';
import types from '../../../../../../../redux/types';

export const CryptoForm = ({ spot }) => {
  const dispatch = useDispatch();
  const isAdressLoading = useSelector(loadingAddressSelector);
  const depositAddress = useSelector(depositAddressSelector);
  const addressRef = useRef();
  const walletName = spot?.asset?.code?.toUpperCase();
  const translatePath = 'Wallets.Spot.CryptoDeposit';

  const handleCopy = ref => {
    ref.current.select();
    document.execCommand('copy');
  };

  useEffect(() => {
    if (spot) {
      dispatch({
        type: types.POST_GENERATE_ADRESS_WALLETS_START,
        walletId: spot.id,
      });
    }
  }, [dispatch, spot]);

  return (
    <div className="row operation-row operation-row--type2">
      <div className="col-lg-6">
        <div className="operation-balance" />
        <div className="operation-tips">
          <div className="operation-tips__header">
            <div className="operation-tips__icon">{tipsLampIcon}</div>
            <p className="operation-tips__title">
              {L.translate(`${translatePath}.Tips.title`)}
            </p>
          </div>
          <ul className="operation-tips__list">
            <li>{L.translate(`${translatePath}.Tips.tip_first`)}</li>
            <li>
              {L.translate(`${translatePath}.Tips.tip_second`, {
                code: <span>1</span>,
              })}
            </li>
            <li>
              {L.translate(`${translatePath}.Tips.tip_third`, {
                code: <span>2</span>,
              })}
            </li>
            <li>{L.translate(`${translatePath}.Tips.tip_fourth`)}</li>
          </ul>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="operation-form-wrap operation-form-wrap--deposit">
          <form className="operation-form">
            <div className="field ">
              <div className="operation-address">
                <p className="operation-address__name">
                  {L.translate(`${translatePath}.Adress.title`)}
                </p>
                <div className="operation-address-value">
                  {isAdressLoading ? (
                    <div className="loader-box">
                      <div className="block-loader">
                        <div className="loader" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <input
                        ref={addressRef}
                        type="text"
                        className="operation-address-value__item"
                        value={depositAddress}
                        readOnly
                      />
                      <button
                        type="button"
                        className="operation-address-value__btn"
                        onClick={() => handleCopy(addressRef)}
                      >
                        {copyAdressIcon}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="operation-form__info">
              <div className="operation-info operation-info--with-coin">
                <p>
                  {L.translate(`${translatePath}.Adress.adress_rule`, {
                    code: walletName,
                  })}
                </p>
                <span>
                  {L.translate(`${translatePath}.Adress.adress_note`, {
                    code: walletName,
                  })}
                </span>
                <div className="operation-info__coin">
                  <img src={spot?.asset?.img_path} alt="spot icon" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
