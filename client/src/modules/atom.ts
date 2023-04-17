import { atom, selector } from "recoil";
import { checkLogin, logout } from "./api";

export const SERVERURL = 'http://localhost:8000';
export const ISCONNECT = true;

export const userAddr = atom<string>({
  key: 'UserAddr',
  default: ""
});

export const userId = atom<number>({
  key: 'UserId',
  default: 0
});

export const userNickname = atom<string>({
  key: 'UserNickname',
  default: "",
});

export const userAmount = atom<number>({
  key: 'UserAmount',
  default: 0
});

export const userReferral = atom<string | null>({
  key: 'UserReferral',
  default: null
});

////
export const checkLoginQuery = selector({
  key: 'CheckLoginQuery',
  get: async () => {
    //get(userId);
    //get(userAddr);
    const response = await checkLogin();
    if(!response) return null;
    return response.data.data;
  },
});

export const logoutQuery = selector({
  key: 'LogoutQuery',
  get: async ({get}) => {
    get(userId);
    get(userAddr);
    const response = await logout();
    if(!response) return null;
    return response.data;
  },
});