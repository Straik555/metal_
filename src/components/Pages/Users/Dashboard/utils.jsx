import React from 'react';
import L from 'i18n-react';
import { helpIcon } from './dashboardIcons';

export const checkUserStatus = status => {
  switch (status) {
    case 'unverified':
      return (
        <>
          <p className="acc-status acc-status--unverified">
            {L.translate('Header.SelectUser.unverified')}
          </p>
          <div className="acc-help">
            <span className="acc-help__icon">{helpIcon}</span>
            <div className="acc-hint">
              <div className="acc-hint__text">
                {L.translate('UsersPage.Dashboard.info_text')}
              </div>
            </div>
          </div>
        </>
      );

    case 'rejected':
      return (
        <p className="acc-status acc-status--unverified">
          {L.translate('Header.SelectUser.reject')}
        </p>
      );

    case 'pending':
      return (
        <p className="acc-status acc-status--unverified">
          {L.translate('Header.SelectUser.pending')}
        </p>
      );

    default:
      return (
        <p className="acc-status">
          {L.translate('Header.SelectUser.approved')}
        </p>
      );
  }
};
