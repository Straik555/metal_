import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from 'chart.js';
import L from 'i18n-react';
import types from '../../../../../redux/types';
import {
  toCrop,
  firstLatterToSmall,
  numberWithCommas,
  getNumbersAfterDot,
} from '../../../../../services/helpers';
import {
  spotWalletSelector,
  walletSelector,
} from '../../../../../redux/wallets/selectors';
import { dashboardSettingsSelector } from '../../../../../redux/settings/selectors';

const COLORS = [
  'rgb(119, 210, 151)',
  'rgb(85, 84, 201)',
  'rgb(218, 142, 45)',
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 206, 86)',
  'rgb(75, 192, 192)',
  'rgb(153, 102, 255)',
  'rgb(255, 159, 64)',
  'rgb(211, 211, 211)',
  'rgb(0, 111, 114)',
  'rgb(72, 40, 37)',
  'rgb(181, 115, 155)',
  'rgb(200, 204, 93)',
  'rgb(0, 163, 207)',
  'rgb(47, 34, 46)',
  'rgb(179, 112, 78)',
  'rgb(236, 194, 160)',
  'rgb(117, 137, 160)',
  'rgb(3, 44, 82)',
  'rgb(247, 56, 46)',
];

const placeholder = {
  '***': 1,
};

const Spot = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const [unhide, setUnhide] = useState(false);
  const [oldDashboard, setOldDashboard] = useState(null);

  const wallets = useSelector(spotWalletSelector);
  const dashboard = useSelector(dashboardSettingsSelector);
  const { total_in_usd, total_in_btc } = useSelector(walletSelector);

  useEffect(() => {
    if (canvasRef?.current && dashboard) {
      if (oldDashboard) {
        oldDashboard.destroy();
      }

      const ctx = canvasRef.current.getContext('2d');
      const data = unhide ? dashboard : placeholder;
      const labels = Object.keys(data).map(label => label.toUpperCase());

      const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [
            Object.keys(dashboard).length
              ? {
                  label: 'asset',
                  data: Object.values(data),
                  backgroundColor: unhide ? COLORS : ['rgb(211, 211, 211)'],
                  borderColor: unhide ? COLORS : ['rgb(211, 211, 211)'],
                  borderWidth: 1,
                }
              : {
                  label: 'asset',
                  data: Object.values(placeholder),
                  backgroundColor: ['rgb(211, 211, 211)'],
                  borderColor: ['rgb(211, 211, 211)'],
                  borderWidth: 1,
                },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          tooltips: {
            callbacks: {
              label(tooltipItem, value) {
                return ` ${value.labels[tooltipItem.index]}`;
              },
            },
          },
          hover: {
            animationDuration: 0,
          },
          animation: {
            duration: 1,
            onComplete() {
              this.chart.aspectRatio = 1.1;
            },
          },
        },
      });

      setOldDashboard(myChart);
    }
  }, [canvasRef, dashboard, unhide]);

  useEffect(() => {
    dispatch({ type: types.GET_DASHBOARD_START });
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-xl-4">
        <div className="balance-block">
          <div className="balance-title">
            <p className="balance-title__item">
              {L.translate('UsersPage.Dashboard.account_balance')}
            </p>
            <button
              className="balance-btn"
              type="button"
              onClick={() => {
                setUnhide(!unhide);
              }}
            >
              {unhide ? (
                <>
                  <svg
                    сlass="stroke"
                    width="18"
                    height="12"
                    viewBox="0 0 30 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 0.999023C5 0.999023 1 10 1 10C1 10 5 18.999 15 18.999C25 18.999 29 10 29 10C29 10 25 0.999023 15 0.999023Z"
                      stroke="#1A202C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 15C17.7614 15 20 12.7614 20 10C20 7.23858 17.7614 5 15 5C12.2386 5 10 7.23858 10 10C10 12.7614 12.2386 15 15 15Z"
                      stroke="#1A202C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {L.translate('UsersPage.Dashboard.hide_balance')}
                </>
              ) : (
                <>
                  <svg
                    className="stroke"
                    width="21"
                    height="15"
                    viewBox="0 0 24 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 0.750092L19.5 17.2501"
                      stroke="#808080"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.5226 11.7749C13.7866 12.4438 12.8151 12.793 11.8217 12.7456C10.8284 12.6983 9.89446 12.2583 9.22548 11.5224C8.5565 10.7865 8.20723 9.81504 8.25448 8.82165C8.30174 7.82827 8.74167 6.89433 9.47749 6.22529"
                      stroke="#808080"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.93698 3.43073C3.11486 5.36625 1.5 9.00009 1.5 9.00009C1.5 9.00009 4.5 15.7494 12 15.7494C13.7572 15.7634 15.4926 15.3586 17.0623 14.5686"
                      stroke="#808080"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.5571 12.8531C21.6011 11.0225 22.5 9.00008 22.5 9.00008C22.5 9.00008 19.5 2.24935 12 2.24935C11.3504 2.24829 10.7019 2.3011 10.061 2.40724"
                      stroke="#808080"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.7058 5.31647C13.5028 5.46952 14.2288 5.87686 14.7747 6.47741C15.3206 7.07795 15.6571 7.83931 15.7337 8.64729"
                      stroke="#808080"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {L.translate('UsersPage.Dashboard.show_balance')}
                </>
              )}
            </button>
          </div>

          <p className="balance-value">
            {unhide ? numberWithCommas(total_in_btc || 0) : '*********'}
            <span className="balance-value__cur">
              {' '}
              {L.translate('UsersPage.Dashboard.btc')}
            </span>
          </p>
        </div>

        <div className="balance-block">
          <div className="balance-title">
            <p className="balance-title__item">
              {L.translate('UsersPage.Dashboard.estimated_value')}
            </p>
          </div>

          <p className="balance-value balance-value--type2">
            {unhide ? numberWithCommas(total_in_usd || 0) : '*********'}
            <span className="balance-value__cur"> $</span>
          </p>
        </div>
      </div>

      <div className="col-xl-8" style={{ minHeight: 320 }}>
        <div className="balance-chart">
          <div
            style={{
              position: 'relative',
              pointerEvents: unhide ? 'auto' : 'none',
            }}
          >
            <canvas ref={canvasRef} />
          </div>

          {wallets && (
            <>
              <div className="balance-chart__info">
                {dashboard &&
                  unhide &&
                  Object.entries(dashboard).map((asset, index) => (
                    <div
                      key={asset[0]}
                      className="chart-explain chart-explain--type1"
                    >
                      <span
                        className="chart-explain__dot"
                        style={{ background: COLORS[index] }}
                      />
                      <p className="chart-explain__cur">
                        {asset[0].toUpperCase()}
                      </p>
                      <p className="chart-explain__value">
                        {numberWithCommas(
                          toCrop(getNumbersAfterDot(asset[0]))(
                            wallets[asset[0]].balance || 0,
                          ),
                        )}
                      </p>
                    </div>
                  ))}

                <p className="balance-chart__text">
                  {L.translate('UsersPage.Dashboard.assets_without_equivalent')}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spot;
