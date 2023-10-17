import React from 'react';
import { dropDownArrow } from '../../../../styles/img/icons';

const SelectWrap = ({ title, children }) => {
  const diactiveteList = classList => {
    setTimeout(() => {
      classList.remove('active');
    }, 300);
  };

  return (
    <li
      onMouseOver={e => e.currentTarget.classList.add('active')}
      onFocus={e => e.currentTarget.classList.add('active')}
      onMouseOut={e => e.currentTarget.classList.remove('active')}
      onBlur={e => diactiveteList(e.currentTarget.classList)}
    >
      <button type="button">
        {title}
        <span className="nav-arrow">{dropDownArrow}</span>
      </button>
      <div
        className="drop-list JS_ITEM_LIST"
        onMouseOut={e => e.currentTarget.parentNode.classList.remove('active')}
        // onBlur={e => e.currentTarget.parentNode.classList.remove('active')}
        onBlur={e => e.currentTarget.classList.remove('active')}
      >
        {children}
      </div>
    </li>
  );
};

export default SelectWrap;
