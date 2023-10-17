import { createTransform } from 'redux-persist';
import CryptoJS from 'crypto-js';

const ababagalamaga = 'a-b-a-b-a-g-a-l-a-m-a-g-a';

export const encryptor = createTransform(
  (inboundState, key) => {
    if (!inboundState) return inboundState;
    const cryptedText = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      ababagalamaga,
    );
    return cryptedText.toString();
  },
  (outboundState, key) => {
    if (!outboundState) return outboundState;
    const bytes = CryptoJS.AES.decrypt(outboundState, ababagalamaga);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  },
);
