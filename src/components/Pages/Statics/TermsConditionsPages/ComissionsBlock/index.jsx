import React, { useEffect } from 'react';
import L from 'i18n-react';
import { useDispatch, useSelector } from 'react-redux';
import types from '../../../../../redux/types';
import { allFeesSelector } from '../../../../../redux/fees/selectors';
import { nomalizeFeesData } from '../../../../../services/helpers';

export const ComissionsBlock = () => {
  const dispatch = useDispatch();
  const allFees = useSelector(allFeesSelector);

  const normalizedFees = nomalizeFeesData(allFees);

  const translatePath = 'Statics.TermsConditionsPages';
  const commissionsPath = `${translatePath}.TypeOfServiceCostsAndCommissions`;
  const physicalDeliveryPath = `${commissionsPath}.DeliveryOfPhysicalGold`;

  useEffect(() => {
    dispatch({ type: types.GET_ALL_FEES_START });
  }, [dispatch]);

  return (
    <div className="list-item-wrapper">
      <li className="terms-list-item">
        <h2>{L.translate(`${commissionsPath}.block_heading`)}</h2>
        <div className="terms-block">
          <p>{L.translate(`${commissionsPath}.p_01`)}</p>
          <h6>
            1){' '}
            <span className="terms-commission-subtitle">
              {L.translate(`${commissionsPath}.p_01_subtitle_01`)}
            </span>
          </h6>
          <ul className="terms-list-item-desc">
            <li>
              {L.translate(`${commissionsPath}.p_01_subtitle_01_option_a`, {
                commission: normalizedFees.mtcgExchange,
              })}
            </li>
            <li>
              {L.translate(`${commissionsPath}.p_01_subtitle_01_option_b`)}
            </li>
            <li>
              {L.translate(`${commissionsPath}.p_01_subtitle_01_option_c`, {
                commission: normalizedFees.mtcgDeposit,
              })}
            </li>
          </ul>
          <h6>
            2){' '}
            <span className="terms-commission-subtitle">
              {L.translate(`${commissionsPath}.p_01_subtitle_02`)}
            </span>
          </h6>
          <ul className="terms-list-item-desc">
            <li>
              {L.translate(`${commissionsPath}.p_01_subtitle_02_option_a`)}
            </li>
            <li>
              {L.translate(`${commissionsPath}.p_01_subtitle_02_option_b`, {
                g_commission_incoming: normalizedFees.goldExchangeFee,
                g_commission_outgoing: normalizedFees.goldWithdrawFee,
              })}
            </li>
            <li>
              {L.translate(`${commissionsPath}.p_01_subtitle_02_option_c`, {
                commission: normalizedFees.goldWithdrawFee,
              })}
            </li>
          </ul>
          <h6>
            3){' '}
            <span className="terms-commission-subtitle">
              {L.translate(`${commissionsPath}.p_01_subtitle_03`, {
                commission: normalizedFees.mtcgExchange,
              })}
            </span>
          </h6>
        </div>
        <div className="terms-block">
          <p>{L.translate(`${commissionsPath}.p_02`)}</p>
          <p>{L.translate(`${commissionsPath}.p_03`)}</p>
        </div>
        <div>
          <h3>{L.translate(`${physicalDeliveryPath}.block_heading`)}</h3>
          <div className="terms-block">
            <p>1) {L.translate(`${physicalDeliveryPath}.p_01`)}</p>
            <p>2) {L.translate(`${physicalDeliveryPath}.p_02`)}</p>
            <div>
              <p>3) {L.translate(`${physicalDeliveryPath}.p_03`)}</p>
              <div style={{ marginLeft: 20 }}>
                <div>
                  <h6 className="terms-commission-subtitle">
                    {L.translate(`${physicalDeliveryPath}.p_03_subtitle_01`)}
                  </h6>
                  <ul className="terms-list-item-desc">
                    <li>
                      {L.translate(
                        `${physicalDeliveryPath}.p_03_subtitle_01_option_a`,
                      )}
                    </li>
                    <li>
                      {L.translate(
                        `${physicalDeliveryPath}.p_03_subtitle_01_option_b`,
                      )}
                    </li>
                    <li>
                      {L.translate(
                        `${physicalDeliveryPath}.p_03_subtitle_01_option_c`,
                      )}
                    </li>
                  </ul>
                </div>
                <div>
                  <h6 className="terms-commission-subtitle">
                    {L.translate(`${physicalDeliveryPath}.p_03_subtitle_02`)}
                  </h6>
                  <ul className="terms-list-item-desc">
                    <li>
                      {L.translate(
                        `${physicalDeliveryPath}.p_03_subtitle_02_option_a`,
                      )}
                    </li>
                    <li>
                      {L.translate(
                        `${physicalDeliveryPath}.p_03_subtitle_02_option_b`,
                      )}
                    </li>
                    <li>
                      {L.translate(
                        `${physicalDeliveryPath}.p_03_subtitle_02_option_c`,
                      )}
                    </li>
                  </ul>
                </div>
                <h6 className="terms-commission-subtitle">
                  {L.translate(`${physicalDeliveryPath}.p_03_subtitle_03`)}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};
