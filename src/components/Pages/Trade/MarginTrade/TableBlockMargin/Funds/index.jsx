import React from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import { toCrop } from '../../../../../../services/helpers';
import { marginWalletSelector } from '../../../../../../redux/wallets/selectors';

const Funds = () => {
  const wallets = useSelector(marginWalletSelector);

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
              <td>{L.translate('Trading.tableBlock.debt')}</td>
              <td>{L.translate('Trading.tableBlock.equity')}</td>
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
                        {` ${data.asset.code.toUpperCase()}`}
                      </p>
                    </div>
                  </td>
                  <td>{toCrop(8)(data.available_balance)}</td>
                  <td>{toCrop(8)(data.balance)}</td>
                  <td>{toCrop(8)(data.frozen_balance)}</td>
                  <td>{toCrop(8)(+data.borrow + +data.interest)}</td>
                  <td>{toCrop(8)(data.equity)}</td>
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
