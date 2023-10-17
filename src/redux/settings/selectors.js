export const userSettingsSelector = state => state.settings.user;
export const dashboardSettingsSelector = state =>
  state.settings.dashboard.settings; // fix was here
export const apiManagemenSettingstSelector = state =>
  state.settings.apiManagement;
export const filesSettingsSelector = state => state.settings.files;
export const filesDataSettingsSelector = state => state.settings.files.data;

export const userSecurityDataSettingsSelector = state =>
  state.settings.security.securityData;

export const secretKeySettingsSelector = state =>
  state.settings.security.secretKey;

export const tokenDiscountsDataSettingsSelector = state =>
  state.settings.dashboard.discounts;
