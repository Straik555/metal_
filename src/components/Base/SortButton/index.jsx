import React, { useState } from 'react';

const SortButton = ({ title, toggleSort, sort, order, children }) => {
  const [thisSort, setThisSort] = useState(sort?.sort || 'asc');
  const thisToggleSort = e => {
    if (e?.target?.dataset?.id !== 'search') {
      setThisSort(thisSort === 'asc' ? 'desc' : 'asc');
      toggleSort({ sort: thisSort === 'asc' ? 'desc' : 'asc', order });
    }
  };
  return (
    <div
      className={
        sort?.order === order
          ? 'td-title td-title--uppercase active'
          : 'td-title td-title--uppercase'
      }
      role="presentation"
      data-order={order}
      data-sort={thisSort}
      onClick={thisToggleSort}
    >
      <span style={{ cursor: 'pointer' }}>{title}</span>
      {sort?.order === order ? (
        <div className="sort-block">
          <div
            className={
              sort?.sort === 'asc'
                ? 'sort-block__item active'
                : 'sort-block__item'
            }
          >
            <i className="fa fa-caret-up" />
          </div>
          <div
            className={
              sort?.sort === 'desc'
                ? 'sort-block__item active'
                : 'sort-block__item'
            }
          >
            <i className="fa fa-caret-down" />
          </div>
        </div>
      ) : (
        <div className="sort-block">
          <div className="sort-block__item">
            <i className="fa fa-caret-up" />
          </div>
          <div className="sort-block__item">
            <i className="fa fa-caret-down" />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default SortButton;
