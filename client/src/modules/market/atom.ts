import { atom, selector, selectorFamily } from "recoil";
import { nft } from "../type";
import { sellCard, CardById } from "./api";
//import { userId } from "../atom";

export const sellCardList = atom<nft[]>({
  key: 'SellCardList',
  default: [],
});

export const currDetailCardId = atom<number>({
  key: 'CurrDetailCardId',
  default: 0,
})

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

export const cardByIdQuery = selectorFamily({
  key: 'CardByIdQuery',
  get: (id: number) => async () => {
    const response = await CardById(id);
    if (response.data.error) {
      throw response.data.error;
    }
    //console.log(response.data)
    if ('status' in response && response.status !== 200) {
      throw new Error(`userInfoQuery failed with status code ${response.status}`);
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

// export const sellCardDetailQuery = selector({
//   key: 'SellCardDetailQuery',
//   get: async ({get}) => {
//     const sellCardLst = await get(sellCardQuery)();  
//     return sellCardLst.data.data.filter((el: nft) => el.id === get(currDetailCardId));
//   },
// });

export const sellCardByIdQuery = selector({
  key: 'SellCardByIdQuery',
  get: ({get}) => get(cardByIdQuery(get(currDetailCardId))).data.data,
});