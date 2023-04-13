import { atom, selector, selectorFamily } from "recoil";
import { userInfo } from "./api";
//import { userId } from "../atom";

export const currentUserId = atom<number>({
  key: 'CurrentUserId',
  default: 0,
});

export const userNickname = atom<string>({
  key: 'UserNickname',
});

export const userInfoQuery = selectorFamily({
  key: 'UserInfoQuery',
  get: (id: number) => async () => {
    const response = await userInfo(id);
    if (response.data.error) {
      throw response.data.error;
    }
    console.log(response.data)
    if ('status' in response && response.status !== 200) {
      throw new Error(`userInfoQuery failed with status code ${response.status}`);
    }
    return response;
  },
});

export const currentUserInfoQuery = selector({
  key: 'CurrentUserInfoQuery',
  get: ({get}) => get(userInfoQuery(get(currentUserId))),
});

export const cardListQuery = selector({
  key: 'CardListQuery',
  get: ({get}) => {
    const currentUserInfo = get(currentUserInfoQuery);
    return currentUserInfo.data.data.nfts;
    console.log(22)
  },
});

export const postListQuery = selector({
  key: 'PostListQuery',
  get: ({get}) => {
    const currentUserInfo = get(currentUserInfoQuery);
    return currentUserInfo.data.data.posts;
  },
});