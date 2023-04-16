import { atom } from "recoil";

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
  default: ""
});

export const userAmount = atom<number>({
  key: 'UserAmount',
  default: 0
});