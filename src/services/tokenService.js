import { decryptData, encryptData } from './security.js'

export const getToken = () => {
    try {
        const token = localStorage.getItem("token");
        return decryptData(token);
    } catch (error) {
        return null;
    }
}

export const deleteTokenAndId = () => {
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("userId")
        return true;
    } catch (error) {
        return false;
    }
}

export const getUserId = () => {
    try {
        const id = localStorage.getItem("userId");
        return decryptData(id);
    } catch (error) {
        return null;
    }
}

export const setTokenAndId = (token, id) => {
    try {
        const encryptToken = encryptData(token);
        localStorage.setItem("token", encryptToken);
        const encryptId = encryptData(id);
        localStorage.setItem('userId', encryptId);
        return true;
    } catch (error) {
        return false;
    }
}