import CryptoJS from 'crypto-js';

const encryptionKey = process.env.REACT_ENCRYPTION_KEY;

export const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
  return encryptedData;
};

export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};