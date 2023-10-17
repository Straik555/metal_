import React, { useEffect, useState } from 'react';
import L from 'i18n-react';

const SearchInputModals = ({ listCoins, onSelect, coin }) => {
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!dropdown) {
      const name = `${coin?.asset?.code?.toUpperCase()} ${coin?.asset?.name}`;
      setSearch(name);
    }
  }, [coin, dropdown]);

  const changeSearch = e => {
    if (e.target.value.length < 15) {
      setSearch(e.target.value);
    }
  };

  const handleFocus = () => {
    setDropdown(true);
    setSearch('');
  };

  const handleBlur = () => {
    // without setTimeout the dropdown will close before we select asset
    setTimeout(() => {
      setDropdown(false);
    }, 300);
  };
  const filterData = (data, search) => {
    return data.filter(
      wallet =>
        wallet?.asset?.code?.includes(search) ||
        wallet?.asset?.name?.includes(search),
    );
  };
  const data = filterData(listCoins, search);
  return (
    <div className="modal-field">
      <span className="field-label field-label--type2">
        {L.translate('Wallets.coin')}
      </span>
      <div className="field-wrap">
        <div className="coin-drop active">
          <div className="coin-drop__box">
            <div className="coin-val d-flex align-items-center">
              {!dropdown && (
                <img
                  src={coin?.asset?.img_path}
                  alt=""
                  width={20}
                  heigth={20}
                />
              )}
              <input
                className="coin-val"
                placeholder="select asset"
                value={search}
                onChange={changeSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
          {dropdown && (
            <div className="coin-drop__list">
              <ul>
                {data?.length ? (
                  data.map(wallet => (
                    <li key={wallet.asset.id}>
                      <button
                        type="button"
                        className="coin-val"
                        data-code={wallet.asset.code}
                        onClick={onSelect}
                      >
                        <img
                          src={wallet.asset.img_path}
                          alt=""
                          className="coin-val__img"
                        />
                        <span className="coin-val__code">
                          {wallet.asset.code.toUpperCase()}
                        </span>
                        <span className="coin-val__name">{` ${wallet.asset.name}`}</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <span
                    className="coin-val__name"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {L.translate('Global.nothing')}
                  </span>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInputModals;
