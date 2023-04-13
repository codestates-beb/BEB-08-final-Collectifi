import { atom, selector, selectorFamily } from "recoil";
import { nft } from "../type";
import { sellCard } from "./api";
//import { userId } from "../atom";

export const sellCardList = atom<nft[]>({
  key: 'SellCardList',
  default: [],
});

export const sellCardQuery = selector({
  key: 'SellCardQuery',
  get: () => async () => {
    const response = await sellCard();
    if (response.data.error) {
      throw response.data.error;
    }
    if ('status' in response && response.status !== 200) {
      throw new Error(`sellCardQuery failed with status code ${response.status}`);
    }
    return response;
  },
});

export const sellCardListQuery = selector({
  key: 'SellCardListQuery',
  get: async ({get}) => {
    const sellCardLst = await get(sellCardQuery)();
    return sellCardLst.data.data;
  }
});

// export const cardListQuery = selector({
//   key: 'CardListQuery',
//   get: ({get}) => {
//     const currentUserInfo = get(currentUserInfoQuery);
//     return currentUserInfo.data.data.nfts;
//   },
// });