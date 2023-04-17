import { atom, selector, selectorFamily } from "recoil";
//import { nft } from "../type";
import { sellCard, cardById, txById, sellApprove, sellRegi, buyApprove, buyCard } from "./api";
import { userAmount, userId } from "../atom";

// export const sellCardList = atom<nft[]>({
//   key: 'SellCardList',
//   default: [],
// });

export const currDetailCardId = atom<number>({ //tokenId
  key: 'CurrDetailCardId',
  default: 0,
});

export const sellPrice = atom<number>({ 
  key: 'SellPrice',
  default: 0,
});

export const sellCardQuery = selector({
  key: 'SellCardQuery',
  get: async ()  => {
    const response = await sellCard();
    if (response.data.error) {
      throw response.data.error;
    }
    if ('status' in response && response.status !== 200) {
      throw new Error(`sellCardQuery failed with status code ${response.status}`);
    }
    return response;
  },
  dangerouslyAllowMutability: false
});

export const cardByIdQuery = selectorFamily({
  key: 'CardByIdQuery',
  get: (id: number) => async ({get}) => {
    get(userId);
    const response = await cardById(id);
    //console.log("cardByIdQuery", response)
    if (response.data.error) {
      throw response.data.error;
    }
    //console.log(response.data)
    if ('status' in response && response.status !== 200) {
      throw new Error(`cardByIdQuery failed with status code ${response.status}`);
    }
    return response;
  },
});

export const txByIdQuery = selectorFamily({
  key: 'TxByIdQuery',
  get: (id: number) => async ({get}) => {
    get(userId);
    const response = await txById(id);
    //console.log("cardByIdQuery", response)
    if (response.data.error) {
      throw response.data.error;
    }
    //console.log(response.data)
    if ('status' in response && response.status !== 200) {
      throw new Error(`cardByIdQuery failed with status code ${response.status}`);
    }
    return response;
  },
});

export const sellApproveQuery = selectorFamily({
  key: 'SellApproveQuery',
  get: (id: number) => async () => {
    const response = await sellApprove(id);
    if (response.data.error) {
      throw response.data.error;
    }
    //console.log(response.data)
    if ('status' in response && response.status !== 200) {
      throw new Error(`sellApproveQuery failed with status code ${response.status}`);
    }
    return response;
  },
});

export const sellRegiQuery = selectorFamily({
  key: 'SellRegiQuery',
  get: (param: { id: number; price: number }) => async () => {
    const response = await sellRegi(param.id, param.price);
    return response;
  },
});

export const buyApproveQuery = selectorFamily({
  key: 'BuyApproveQuery',
  get: (token_amount: number) => async ({get}) => {
    get(userAmount);
    const response = await buyApprove(token_amount);
    if (response.data.error) {
      throw response.data.error;
    }
    //console.log(response.data)
    if ('status' in response && response.status !== 200) {
      throw new Error(`buyApproveQuery failed with status code ${response.status}`);
    }
    return response;
  },
});

export const buyCardQuery = selectorFamily({
  key: 'BuyCardQuery',
  get: (param: {price: number, ownerId: number}) => async ({get}) => {
    get(userAmount);
    const response = await buyCard(get(currDetailCardId), param.ownerId, param.price);
    return response;
  },
});

/////

export const getSellCardListQuery = selector({
  key: 'GetSellCardListQuery',
  get: async ({get}) => {
    const sellCardLst = await get(sellCardQuery);
    return sellCardLst.data.data;
  }
});

// export const getSellCardByIdQuery = selector({
//   key: 'GetSellCardByIdQuery',
//   get: ({get}) => get(cardByIdQuery(get(currDetailCardId))).data.data.nft,
// });

export const getSellApproveQuery = selector({
  key: 'GetSellApproveQuery',
  get: ({get}) => {
    const sellApporve = get(sellApproveQuery(get(currDetailCardId)));
    return sellApporve.data.data;
  }
});

export const getSellRegiQuery = selector({
  key: 'GetSellRegiQuery',
  get: ({get}) => {    
    const sellRegi = get(sellRegiQuery({id: get(currDetailCardId), price: get(sellPrice)}));
    if(!sellRegi) return null;
    return sellRegi.data;
  }
});

export const getBuyApproveQuery = selectorFamily({
  key: 'GetBuyApproveQuery',
  get: (token_amount: number) => async ({get}) => {   
    const buyApporve = get(buyApproveQuery(token_amount));
    return buyApporve.data.data;
  },
});

// export const getBuyCardQuery = selectorFamily({
//   key: 'GetBuyCardQuery',
//   get: (price: number) => async ({get}) => {   
//     const sellRegi = get(buyCardQuery(price));
//     if(!sellRegi) return null;
//     return sellRegi.data;
//   },
// });