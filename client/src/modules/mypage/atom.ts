import { atom, selector, selectorFamily } from "recoil";
import { userInfo, editNickname, editReferral, galleryInfo, withdraw, updateWithdraw} from "./api";
import { userId, userNickname, userAmount } from "../atom";

export const currentUserId = atom<number>({
  key: 'CurrentUserId',
  default: 0,
});


export const userInfoQuery = selectorFamily({
  key: 'UserInfoQuery',
  get: (id: number) => async ({get}) => {
    get(userId);
    get(userAmount);
    //get(userNickname);
    const response = await userInfo(id);
    return response;
  },
});

export const editNicknameQuery = selectorFamily({
  key: 'EditNicknameQuery',
  get: (newNickname: string) => async ({get}) => {
    get(userNickname);
    const response = await editNickname(newNickname);
    return response;
  }, 
});

export const editReferralQuery = selectorFamily({
  key: 'EditReferralQuery',
  get: (address: string) => async ({get}) => {
    get(userId);
    const response = await editReferral(address);
    return response;
  }, 
});

export const galleryInfoQuery = selectorFamily({
  key: 'GalleryInfoQuery',
  get: (id: number) => async ({get}) => {
    get(userId);
    get(userAmount);
    //get(userNickname);
    const response = await galleryInfo(id);
    return response;
  },
});

export const withdrawQuery = selectorFamily({
  key: 'WithdrawQuery',
  get: (id: number) => async () => {
    const response = await withdraw(id);
    if(!response) return null;
    return response;
  },
});

export const updateWithdrawQuery = selectorFamily({
  key: 'UdateWithdrawQuery',
  get: (param: {gallId: number, nftId: number}) => async () => {
    const response = await updateWithdraw(param.gallId, param.nftId);
    if(!response) return null;
    return response;
  },
});

export const getUserInfoQuery = selector({
  key: 'GetUserInfoQuery',
  get: ({get}) => {
    const userInfo = get(userInfoQuery(get(currentUserId)))
    if(!userInfo) return null;
    return userInfo;
  },
});

export const getUserQuery = selector({
  key: 'GetUserQuery',
  get: ({get}) => {
    const userInfo = get(getUserInfoQuery)
    if(!userInfo) return null;
    return {user: userInfo.data.data.user, isOwner: userInfo.data.data.isOwner};
  },
});

export const getCardListQuery = selector({
  key: 'GetCardListQuery',
  get: ({get}) => {
    const currentUserInfo = get(getUserInfoQuery);
    if(!currentUserInfo) return null;
    return currentUserInfo.data.data.nfts;
  },
});

export const getPostListQuery = selector({
  key: 'GetPostListQuery',
  get: ({get}) => {
    const currentUserInfo = get(getUserInfoQuery);
    if(!currentUserInfo) return null;
    return currentUserInfo.data.data.posts;
  },
});