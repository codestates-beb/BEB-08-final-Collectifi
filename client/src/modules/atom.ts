import { atom } from "recoil";

export const SERVERURL = 'http://localhost:8000';
export const ISCONNECT = false;

export const userAddr = atom<string>({
  key: 'UserAddr',
});

export const userId = atom<number>({
  key: 'UserId',
});