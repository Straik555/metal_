import React from 'react';
import L from 'i18n-react';

function PairsTableHead() {
  return (
    <thead>
      <tr>
        <td>
          <div className="td-title">
            {window.location.pathname === '/pairs/futures' ||
            window.location.pathname === '/pairs/favorite/futures'
              ? L.translate('Trading.listOfPairs.contract')
              : L.translate('Trading.listOfPairs.currency')}
          </div>
        </td>
        <td>
          <div className="td-title td-title--uppercase">
            {L.translate('Trading.listOfPairs.last_price')}
          </div>
        </td>
        <td>
          <div className="td-title td-title--uppercase">
            {L.translate('Trading.listOfPairs.change_24')}
          </div>
        </td>
        <td>
          <div className="td-title td-title--uppercase">
            {L.translate('Trading.listOfPairs.high_24')}
          </div>
        </td>
        <td>
          <div className="td-title td-title--uppercase">
            {L.translate('Trading.listOfPairs.low_24')}
          </div>
        </td>
        {/* <td>
          <div className="td-title td-title--uppercase">
            Market Cap
            <div className="table-sort">
              <button type="button">
                <span className="d-flex">
                  <i className="fa fa-caret-up" />
                </span>
              </button>
              <button type="button">
                <span className="d-flex">
                  <i className="fa fa-caret-down" />
                </span>
              </button>
            </div>
          </div>
        </td> */}
        <td>
          <div className="td-title td-title--uppercase">
            {L.translate('Trading.listOfPairs.volume_24')}
          </div>
        </td>
        <td className="td-center">
          <span className="td-title td-title--uppercase">{/* Edit */}</span>
        </td>
      </tr>
    </thead>
  );
}

export default PairsTableHead;
