import { put, takeLatest, call, all } from 'redux-saga/effects';
import types from '../../types';
import api from '../../../services/api';
import notification from '../../../services/notification';
import { formatCountryName, windowReference, iOS} from '../../../services/helpers';

function* getCountriesIdentification() {
  try {
    const { data, status } = yield call(
      api.settings.identification.getCountryKYC,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    const formattedCountries = [...data]
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(country => ({ ...country, name: formatCountryName(country.name) }));

    yield put({
      type: types.GET_COUNTRIES_IDENTIFICATION_SUCCESS,
      payload: formattedCountries,
    });
  } catch (err) {
    yield put({ type: types.GET_COUNTRIES_IDENTIFICATION_FAILURE });
  }
  try {
    const { data, status } = yield call(
      api.settings.identification.getLanguagesKYC,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    const formattedCountries = [...data]
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(country => ({ ...country, name: formatCountryName(country.name) }));

    yield put({
      type: types.GET_LANGUAGES_IDENTIFICATION_SUCCESS,
      payload: formattedCountries,
    });
  } catch (err) {
    yield put({ type: types.GET_LANGUAGES_IDENTIFICATION_FAILURE });
  }
}

function* getLanguagesIdentification() {
  try {
    const { data, status } = yield call(
      api.settings.identification.getLanguagesKYC,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    const formattedCountries = [...data.data]
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(country => ({ ...country, name: formatCountryName(country.name) }));

    yield put({
      type: types.GET_LANGUAGES_IDENTIFICATION_SUCCESS,
      payload: formattedCountries,
    });
  } catch (err) {
    yield put({ type: types.GET_LANGUAGES_IDENTIFICATION_FAILURE });
  }
}

function* verifyStartKYC({ payload, setIosLink }) {
  try {
    const { data, status } = yield call(
      api.settings.identification.getVerificationKYC,
      payload,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');

    yield put({
      type: types.POST_KYC_VERIFICATIONS_SUCCESS,
    });
    //const verification_url = "https://www.w3schools.com/TAgs/tryit.asp?filename=tryhtml_iframe_name"

    if (data?.verification_url) {
    //if (verification_url) {
      // if (iOS) {
      //   setIosLink({ url: data.verification_url, param: {} });
      //   notification({
      //     type: 'info',
      //     title: 'KYC',
      //     message: 'Generate link success',
      //   });
      // } else {

        windowReference(data?.verification_url);
        notification({
          type: 'info',
          title: 'KYC',
          message: 'Open ShuftiPro KYC',
        });
      //}
    } else {
      notification({
        type: 'error',
        title: 'KYC',
        message: 'Open ShuftiPro KYC site wrong',
      });
    }
  
  } catch (error) {
    yield put({ type: types.POST_KYC_VERIFICATIONS_FAILURE });
    if (error?.response?.status === 401) return;

    console.dir(error);
  }
}

export function* rootSagaIdentificationKYC() {
  yield all([
    takeLatest(
      types.GET_COUNTRIES_IDENTIFICATION_START,
      getCountriesIdentification,
    ),
    takeLatest(types.POST_KYC_VERIFICATIONS_START, verifyStartKYC),
    // takeLatest(
    //   types.GET_LANGUAGES_IDENTIFICATION_START,
    //   getLanguagesIdentification,
    // ),
    // takeLatest(
    //   types.SEND_PAY_PAL_FIAT_WITHDRAWAL_REQUEST_START,
    //   sendPayPalFiatWithdrawalRequest,
    // ),
  ]);
}

// export function* watcherCountres() {
//   yield takeLatest(types.GET_COUNTRIES_IDENTIFICATION_START, verifyUserStartKYC);
// }
