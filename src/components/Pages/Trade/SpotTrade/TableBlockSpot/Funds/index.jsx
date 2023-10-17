import React from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import {
  toCrop,
  firstLatterToSmall,
  numberWithCommas,
} from '../../../../../../services/helpers';
import { spotWalletSelector } from '../../../../../../redux/wallets/selectors';

const Funds = () => {
  const wallets = useSelector(spotWalletSelector);

  return (
    <div className="bottom-part__table">
      <div className="market-table market-table--bottom-table">
        <table className="trade-table trade-table--bottom">
          <thead>
            <tr>
              <td>{L.translate('Trading.tableBlock.asset')}</td>
              <td>{L.translate('Trading.tableBlock.balance')}</td>
              <td>{L.translate('Trading.tableBlock.available_balance')}</td>
              <td>{L.translate('Trading.tableBlock.in_order')}</td>
              <td>{L.translate('Trading.tableBlock.btc_quantity')}</td>
            </tr>
          </thead>

          <tbody>
            {!wallets ? (
              <tr>
                <td
                  className="text-center"
                  colSpan={10}
                  style={{ textAlign: 'center' }}
                >
                  {L.translate('Global.nothing')}
                </td>
              </tr>
            ) : (
              Object.values(wallets).map(data => (
                <tr key={data.id} className="table_row change">
                  <td>
                    <div className="coin">
                      <div className="coin__img">
                        <img src={data.asset.img_path} alt={data.asset.code} />
                      </div>
                      <p className="coin__name">
                        {` ${
                          data.asset.code === 'jtesta'
                            ? firstLatterToSmall(data.asset.code)
                            : data.asset.code.toUpperCase()
                        }`}
                      </p>
                    </div>
                  </td>
                  <td>{numberWithCommas(toCrop(8)(data.total))}</td>
                  <td>{numberWithCommas(toCrop(8)(data.balance))}</td>
                  <td>{numberWithCommas(toCrop(8)(data.frozen_balance))}</td>
                  <td>{numberWithCommas(toCrop(8)(data.btc_value))}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funds;
