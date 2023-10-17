import React from 'react';

const PasswordDifficult = props => {
  const { password, passwordDifficult } = props;
  return (
    <div className={`pass-lvl pass-lvl--${passwordDifficult}`}>
      <div
        className={
          password.length > 14 && passwordDifficult === 'strong'
            ? 'pass-lvl__item active'
            : 'pass-lvl__item'
        }
      />
      <div
        className={
          password.length > 12 && passwordDifficult === 'strong'
            ? 'pass-lvl__item active'
            : 'pass-lvl__item'
        }
      />
      <div
        className={
          password.length > 10 && passwordDifficult !== 'weak'
            ? 'pass-lvl__item active'
            : 'pass-lvl__item'
        }
      />
      <div
        className={
          password.length >= 8 && passwordDifficult !== 'weak'
            ? 'pass-lvl__item active'
            : 'pass-lvl__item'
        }
      />
      <div
        className={
          password.length > 0 ? 'pass-lvl__item active' : 'pass-lvl__item'
        }
      />
    </div>
  );
};

export default PasswordDifficult;
