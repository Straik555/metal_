import moment from 'moment';
import jstz from 'jstz';
import L from 'i18n-react';
import { store } from '../redux/store';
import types from '../redux/types';

const { dispatch } = store;

// Choose only one, depends from server!
// export const captchaKey = '6LeJqAYaAAAAAOwEK7IST8O8wf55XBI69ERwU07o'; // for client (3)
export const captchaKey = '6LddDMsZAAAAAPhLr8aWJ9veb80juXQKtMfAWCOh'; // for testing (204) http://204.236.192.248:8852/ or "http://13.51.52.63:8852/"

export const addZeroAfterPoint = n => {
  if (n > 1) {
    return `0${addZeroAfterPoint(n - 1)}`;
  }
  return '0';
};

// Has been not used.
export const checkIsIOSBrowser = () => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const postalCodeValidatior = (value, canBeEmpty = false) => {
  if (canBeEmpty && value === '') return true;

  return /^[\d]+$/i.test(value);
};

export const checkIsWSOpen = webSoket => webSoket.readyState === webSoket.OPEN;

export const sortSpotByType = (array, type) => {
  const copy = [...array];

  copy.sort(a => {
    if (a?.asset?.type === type) return 1;
    return -1;
  });
  return copy;
};

export const nomalizeFeesData = allFees => {
  const result = {
    cryptoMin: 0,
    cryptoMax: 0,
    mtcgDeposit: 0,
    mtcgExchange: 0,
    goldWithdrawFee: 0,
    goldExchangeFee: 0,
  };
  if (!Array.isArray(allFees) || allFees.length === 0) return result;

  const cryptoExchangeFees = [];
  allFees.forEach(currency => {
    if (currency?.type === 'fiat') return;

    if (currency?.code?.toLowerCase() === 'gold') {
      result.goldWithdrawFee = currency.withdraw_fee;
      result.goldExchangeFee = currency.exchange_fee;
    }
    if (currency?.code?.toLowerCase() === 'mtcg') {
      result.mtcgDeposit = currency.deposit_fee;
      result.mtcgExchange = currency.exchange_fee;
    }

    if (Number.isFinite(currency?.exchange_fee)) {
      cryptoExchangeFees.push(currency.exchange_fee);
    }
  });
  if (cryptoExchangeFees.length === 0) return result; // Just to be sure we'll not get +Infinity or -Infinity values below

  result.cryptoMin = Math.min(...cryptoExchangeFees);
  result.cryptoMax = Math.max(...cryptoExchangeFees);

  return result;
};

export const formatCountryName = country => country.split('_').join(' ');

export const checkImageType = (typeString, allowedFormats) => {
  const [type, currentFormat] = typeString.split('/');
  if (type !== 'image') return false;

  return allowedFormats.some(format => format.toLowerCase() === currentFormat);
};

export const getValidNumber = numString => {
  const formatted = String(numString).split(',').join('');
  return Number(formatted);
};

export const comissionCalculator = (comissionPercent, amount) => {
  if (!Number.isFinite(comissionPercent) || !Number.isFinite(amount)) {
    throw new Error('Invalid commission or amount');
  }

  return (amount / 100) * comissionPercent;
};

export const getNumbersAfterDot = code => {
  const formatted = String(code).toLowerCase();
  switch (formatted) {
    case 'usd':
    case 'eur':
      return 2;
    case 'mtcg':
      return 4;
    default:
      return 8;
  }
};

export const checkIsOnlyLetters = (
  string,
  minLength = 1,
  canBeEmpty = false,
) => {
  if (canBeEmpty && string === '') return true;

  const onlyLetters = /^([^\d=+/*(){}<>""'`\,_.!@#№~$^&[\]\|?;:])+$/i.test(
    string,
  );

  if (canBeEmpty) {
    return onlyLetters;
  }
  const notEmptyAfterTrim = string.trim() !== '';
  return onlyLetters && notEmptyAfterTrim && string.length >= minLength;
};

export const toCrop = amount => {
  const max = amount || 0;
  return function (string) {
    const symb = +string < 0 ? '-' : '';
    const value = `${
      `${string}`.replace(',', '.').split('.')[1] ? `${string}` : `${string}.`
    }${addZeroAfterPoint(max)}`.replace(',', ''); // .replace(',', '.'); - error
    if (max) {
      const reg = new RegExp(`\\d+(?:\\.\\d{0,${max}})?`);
      return symb + value.match(reg)[0];
    }
    const reg = new RegExp(`\\d+(?:\\.\\d{0)?`);
    return symb + value.match(reg)[0];
  };
};

export const firstLatterToSmall = word => {
  if (typeof word === 'string') {
    if (word && !word?.trim().length) return;
    if (word) return word?.charAt(0) + word.slice(1).toUpperCase();
  }
};

export const firstLatterToUppercase = word => {
  if (typeof word === 'string') {
    if (word && !word?.trim().length) return;
    if (word) return word?.charAt(0).toUpperCase() + word.slice(1);
  }
};

export const cropNumber = (number, numbersAfterDot) => {
  if (number || number === 0) {
    let exp = '';
    const numStr = String(number);
    if (numStr.includes('e')) {
      exp = `e${numStr.split('e')[1]}`;
    }
    // if (number >= 1) {
    //   return toCrop(2)(number) + exp;
    // }
    // if (number > 0 && number < 1) {
    //   return toCrop(8)(number) + exp;
    // }
    // return toCrop(2)(number) + exp;
    if (numbersAfterDot) {
      return toCrop(numbersAfterDot)(number) + exp;
    }
    return toCrop(8)(number) + exp;
  }
};

export const cropNumberToInt = number => {
  if (number || number === 0) {
    return toCrop(-1)(number);
  }
};

export const numberWithCommas = number => {
  // if (!String(number)?.includes('.')) {
  //   return String(number).replace(/','/g, '');
  // }
  return String(number).replace(/(\B)(?=(\d{3})+\.)/g, ',');
};

export const formatBalance = (balance, assetCode) => {
  const result = numberWithCommas(
    cropNumber(balance, getNumbersAfterDot(assetCode)),
  );
  if (assetCode?.toLowerCase() === 'gold') return `${result} grams`;
  return result;
};

export const numberWithCommasNotDot = number => {
  return String(number).replace(/(\B)(?=(\d{3})+(?!\d))/g, ',');
};

export const pushToMiddle = (word, symb) => {
  // check if uses in futures Chart, may be not nedded
  if (word) {
    const lpart = word.slice(0, word.length / 2);
    const rpart = word.slice(word.length / 2);
    return lpart + symb + rpart;
  }
};

export const hideEmail = string => {
  if (string) {
    const splittedString = string.split('@');
    const { length } = splittedString[0];
    const stars = '***';
    const firstThreeLetters = splittedString[0].slice(-length, 2);
    const result = firstThreeLetters + stars + splittedString[1];
    return result;
  }
};

export const intNumberValidation = text => {
  if (text === '') return true;
  const regExp = /^\d{1,8}$/;
  if (!regExp.test(text)) return false;
  return true;
};

// export const numberValidation = text => {
//   if (text[text.length - 1] === ',') return false;
//   if (text === '') return true;
//   let regExp = /^(?:[0-9,]{1,8}[\.][0-9]{1,8}|[0-9,]{1,8}[\.]|[0-9,]{1,8})$/;
//   if (text.includes(',')) {
//     regExp = /^(?:[0-9,]{1,10}[\.][0-9]{1,8}|[0-9,]{1,10}[\.]|[0-9,]{1,10})$/;
//   }
//   if (!regExp.test(text)) return false;

//   return true;
// };

export const numberValidation = text => {
  if (text === '') return true;

  if (text[0] === '0' && text[1] && text[1] !== '.') return false;
  const regExp = /^(?:[0-9]{1,2}[\,][0-9]{1,3}[\,][0-9]{1,3}[\.][0-9]{1,8}|[0-9]{1,3}[\,][0-9]{1,3}[\.][0-9]{1,8}|[0-9]{1,2}[\,][0-9]{1,3}[\,][0-9]{1,3}[\.][0-9]{1,8}|[0-9]{1,3}[\,][0-9]{0,3}|[0-9]{1,3}[\,][0-9]{0,3}|[0-9]{1,2}[\,][0-9]{1,3}[\,][0-9]{1,3}[\.]|[0-9]{1,3}[\,][0-9]{1,3}[\.]|[0-9]{1,2}[\,][0-9]{1,3}[\,][0-9]{0,3}|[0-9]{1,3}[\,][0-9]{1,3}|[0-9]{1,8}[\.][0-9]{1,8}|[0-9]{1,8}[\.]|[0-9]{1,8})$/;
  if (!regExp.test(text)) return false;
  return true;
};

export const checkIsCommaLastCharacter = value => {
  const string = String(value); // To prevent error case when we got other data type than string

  return string[string.length - 1] === ',';
};

export const amountValidation = (before = 8, after = 8) => {
  return function (text) {
    if (text === '') return true;
    const regExp = new RegExp(
      `^(?:[0-9]{1,${before}}[\.][0-9]{1,${after}}|[0-9]{1,${before}}[\.]|[0-9]{1,${before}})$`,
    );
    if (!regExp.test(text)) return false;
    return true;
  };
};

export const empty = text => {
  if (!text || text.length === 0) return true;
  return false;
};

export const passwordValid = password => {
  if (password.length < 8) return false;
  const regExp = /(?!.*\s)(?=^.{8,25}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*$/;
  if (!regExp.test(password)) return false;
  return true;
};

export const passwordConfirm = (password, confirmPassword) => {
  if (confirmPassword.length <= 8) return false;
  if (password !== confirmPassword) return false;
  const regExp = /(?=^.{8,32}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  if (!regExp.test(password)) return false;
  return true;
};

export const emailValid = email => {
  if (email.length === 0) return false;
  // const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  const regExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!regExp.test(email)) return false;
  return true;
};

export const phoneValid = phone => {
  if (phone.length === 0) return false;
  const regExp = /^[\+][1-9]{1}[\d]{9,13}$/;
  if (!regExp.test(phone)) return false;
  return true;
};

const hostname = window?.location?.hostname;
const protocol = window?.location?.protocol;

export const wsUrl = () => {
  if (hostname === '127.0.0.1') {
    return `ws://${hostname}:8980`;
  }
  if (protocol === 'http:' && hostname !== 'localhost') {
    return `ws://${hostname}:8080`;
  }
  if (protocol === 'https:') {
    return `wss://${hostname}:8443`;
  }
  return 'wss://f23owbp5dxgo.corp.merehead.xyz:8443'; // 'ws://54.170.4.102:8080'; // 'ws://13.51.52.63:8852';  'ws://204.236.192.248:8850'
};

export const range = (start, end) => {
  const arr = [];
  for (let i = start; i <= end; i += 1) {
    arr.push(i);
  }
  return arr;
};

export const addZero = value => String(value).padStart(2, '0');

export const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const sortTableColumn = ({ sort, data, setState }) => {
  // data needs to be an array
  if (data?.length === 0) return;
  const sortedData = data?.sort((itemA, itemB) => {
    const a =
      itemA.coin ||
      itemA[sort.order] ||
      itemA[sort.order] === 0 ||
      itemA[sort.order]?.length === 0; // needs to be checked;
    const b =
      itemB.coin ||
      itemB[sort.order] ||
      itemB[sort.order] === 0 ||
      itemB[sort.order]?.length === 0; // needs to be checked;;
    if (isNaN(+a)) {
      if (sort?.sort === 'desc') {
        return a < b ? -1 : 1;
      }
      if (sort?.sort === 'asc') {
        return a < b ? 1 : -1;
      }
    } else {
      if (sort?.sort === 'desc') {
        return +a < +b ? -1 : 1;
      }
      if (sort?.sort === 'asc') {
        return +a < +b ? 1 : -1;
      }
    }
    return 0;
  });
  setState(sortedData);
};

// need it just for old functional
export const sortingColumnTable = ({ sort, data, setState }) => {
  if (Object.keys(data).length === 0) return;
  if (!sort?.sort && !sort?.order) return;
  const newData = data?.sort((itemA, itemB) => {
    const a =
      itemA[sort.order] ||
      itemA[sort.order] === 0 ||
      itemA[sort.order]?.length === 0 || // needs to be checked
      itemA.asset[sort.order] ||
      itemA.mem_info[sort.order];
    const b =
      itemB[sort.order] ||
      itemB[sort.order] === 0 ||
      itemB[sort.order]?.length === 0 || // needs to be checked
      itemB.asset[sort.order] ||
      itemB.mem_info[sort.order];

    if (isNaN(+a)) {
      if (sort?.sort === 'desc') {
        return a < b ? -1 : 1;
      }
      if (sort?.sort === 'asc') {
        return a < b ? 1 : -1;
      }
    } else {
      if (sort?.sort === 'desc') {
        return +a < +b ? -1 : 1;
      }
      if (sort?.sort === 'asc') {
        return +a < +b ? 1 : -1;
      }
    }
    return 0;
  });
  setState(newData);
};

export const checkType = type => {
  switch (type) {
    case 'input':
      return L.translate('Wallets.deposit');
    case 'output':
      return L.translate('Wallets.withdrawal');
    default:
      return '-';
  }
};

export const statusText = status => {
  switch (status) {
    case 'confirmed':
      return L.translate('Wallets.status_type.confirmed');
    case 'unconfirmed':
      return L.translate('Wallets.status_type.unconfirmed');
    case 'completed':
      return L.translate('Wallets.status_type.completed');
    case 'pending':
      return L.translate('Wallets.status_type.pending');
    case 'waiting':
      return L.translate('Wallets.status_type.waiting');
    case 'processing':
      return L.translate('Wallets.status_type.processing');
    case 'processed':
      return L.translate('Wallets.status_type.processed');
    case 'canceled':
      return L.translate('Wallets.status_type.canceled');
    case 'rejected':
      return L.translate('Wallets.status_type.rejected');
    case 'in_progress':
      return L.translate('Wallets.status_type.in_progress');
    case 'in progress':
      return 'In progress';
    default:
      return L.translate('Wallets.status_type.not_status');
  }
};

export const changeContract = contract => {
  dispatch({ type: types.SET_CURRENT_CONTRACT_START, payload: contract });
  dispatch({ type: types.FUTURES_SELECT_CONTRACT, payload: contract });
};

export const cropUsdt = (pair, price) => {
  // if (
  //   pair?.toLowerCase()?.includes('usdt') ||
  //   pair?.toLowerCase()?.includes('usd') ||
  //   pair?.toLowerCase()?.includes('eur')
  // ) {
  //   return cropNumber(price);
  // }

  return toCrop(8)(price);
};

export const subtractMonth = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
};

export const transformData = (time, format) => {
  if (typeof time === 'number') {
    return moment(time * 1000).format(format || 'DD-MM-YYYY HH:mm:ss');
  }
  return time;
};

export const getTimezone = () => {
  const timezone = jstz.determine();
  const timezoneName = timezone.name();
  const string = [
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'America/Phoenix',
    'America/Toronto',
    'America/Vancouver',
    'America/Argentina/Buenos_Aires',
    'America/El_Salvador',
    'America/Sao_Paulo',
    'America/Bogota',
    'America/Caracas',
    'Europe/Moscow',
    'Europe/Athens',
    'Europe/Belgrade',
    'Europe/Berlin',
    'Europe/London',
    'Europe/Luxembourg',
    'Europe/Madrid',
    'Europe/Paris',
    'Europe/Rome',
    'Europe/Warsaw',
    'Europe/Istanbul',
    'Europe/Zurich',
    'Australia/Sydney',
    'Australia/Brisbane',
    'Australia/Adelaide',
    'Australia/ACT',
    'Asia/Almaty',
    'Asia/Ashkhabad',
    'Asia/Tokyo',
    'Asia/Taipei',
    'Asia/Singapore',
    'Asia/Shanghai',
    'Asia/Seoul',
    'Asia/Tehran',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Hong_Kong',
    'Asia/Bangkok',
    'Asia/Chongqing',
    'Asia/Jerusalem',
    'Asia/Kuwait',
    'Asia/Muscat',
    'Asia/Qatar',
    'Asia/Riyadh',
    'Pacific/Auckland',
    'Pacific/Chatham',
    'Pacific/Fakaofo',
    'Pacific/Honolulu',
    'America/Mexico_City',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Asia/Kathmandu',
    'US/Mountain',
  ];
  const kiev = ['Europe/Kiev', 'Europe/Zaporozhye', 'Europe/Uzhgorod'].includes(
    timezoneName,
  )
    ? 'Europe/Athens'
    : timezoneName;
  return string.includes(kiev) ? kiev : 'Etc/UTC';
};

export const toJoinArray = async ({ all, favorites }) => {
  const result = await all.map(item => {
    const includes = favorites.find(el => {
      return String(el.id) === String(item.id);
    });
    if (includes?.id) {
      return { ...item, favorite: true };
    }
    return item;
  });
  return result;
};

export const toUpdateArray = (id, all) => {
  const result = all.map(item => {
    if (String(item?.id) === String(id)) {
      return { ...item, favorite: !item.favorite };
    }
    return item;
  });
  return result;
};

export const toUpdate = (first, second) => {
  try {
    let newSecond = second;
    const arr = Object.entries(first);
    arr.forEach(element => {
      const key = element[0];
      const value = element[1];
      if (newSecond[key] === undefined) {
        newSecond = { ...newSecond, [key]: value };
        return;
      }
      if (typeof value === 'object' && !value?.length && value !== null) {
        return toUpdate(value, newSecond[key]);
      }
      newSecond[key] = value;
    });
    return newSecond;
  } catch (error) {
    return { ...second, ...first };
  }
};

export const windowReference = url => {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  //a.target="iframe_a"
  a.onclick = "this.target='_blank';";
  //a.onclick = "this.target='iframe_a';";
  a.click();
};

export const validateData = (national)=>{
  for(let key in national){
    if(national[key] === ""){
      return false
    }
  }
  return true;
}
