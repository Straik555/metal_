import L from 'i18n-react';

export const getStatus = status => {
  switch (status) {
    case 'approved':
      return L.translate('Header.SelectUser.approved');
    case 'rejected':
      return L.translate('Header.SelectUser.reject');
    case 'pending':
      return L.translate('Header.SelectUser.pending');
    case 'unverified':
      return L.translate('Header.SelectUser.unverified');
    default:
      break;
  }
};
