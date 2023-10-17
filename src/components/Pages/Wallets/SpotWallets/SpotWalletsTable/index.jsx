/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import L from 'i18n-react';
import { useSelector } from 'react-redux';
import LoaderTable from '../../../../Base/Loader/LoaderTable';
import {
  sortingColumnTable,
  sortSpotByType,
} from '../../../../../services/helpers';
import NothingToShow from '../../../../Base/NothingToShow';
import SortButton from '../../../../Base/SortButton';
import SpotWalletsItem from './SpotWalletsItem';
import { loadingWalletSelector } from '../../../../../redux/wallets/selectors';
import { searchIcon } from './TableIcons';

const SpotWalletsTable = ({ data }) => {
  const [sort, setSort] = useState({ sort: 'desc', order: 'code' });
  const [wallets, setWallets] = useState([]);
  const loading = useSelector(loadingWalletSelector);

  const sortedByType = useMemo(() => sortSpotByType(data, 'fiat'), [data]);

  useEffect(() => setWallets(sortedByType), [sortedByType]);

  useMemo(() => sortingColumnTable({ sort, data, setState: setWallets }), [
    sort,
    data,
  ]);

  const toggleSort = e => {
    const { order, sort } = e;
    setSort({ order, sort });
  };

  return (
    <div className="table-box">
      {/* <div className="balance-search">
        <div className="balance-search__item">
          <div className="field-wrap">
            <input
              type="text"
              className="form-item form-item--icon-right"
              placeholder="Search coin"
            />
            <span className="field-icon field-icon--right">{searchIcon}</span>
          </div>
        </div>
      </div> */}

      <table className="page-table page-table--balance-table page-table--sm-transform">
        <thead>
          <tr>
            <td>
              <SortButton
                title={L.translate('Wallets.coin')}
                toggleSort={toggleSort}
                sort={sort}
                order="code"
              />
            </td>
            <td>
              <SortButton
                number
                title={L.translate('Wallets.total')}
                toggleSort={toggleSort}
                sort={sort}
                order="total"
              />
            </td>
            <td>
              <SortButton
                title={L.translate('Wallets.available')}
                toggleSort={toggleSort}
                sort={sort}
                order="balance"
              />
            </td>
            <td>
              <SortButton
                title={L.translate('Wallets.locked')}
                toggleSort={toggleSort}
                sort={sort}
                order="frozen_balance"
              />
            </td>
            <td>
              <span className="td-title td-title--uppercase">
                {L.translate('Wallets.action')}
              </span>
            </td>
          </tr>
        </thead>
        {(loading && <LoaderTable colSpan={5} />) || (
          <tbody>
            {wallets.length ? (
              wallets.map(wallet => (
                <SpotWalletsItem wallet={wallet} key={wallet.id} />
              ))
            ) : (
              <NothingToShow colSpan={5} />
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default SpotWalletsTable;
