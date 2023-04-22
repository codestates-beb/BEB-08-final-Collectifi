import { atom, selector, selectorFamily } from "recoil";
import { galleries, cardByGallId, addCardByGallId, stake, addCardRegi } from "./api";
import { userId, userAmount } from "../atom";
import { gallery } from "./type";

const defaultGallery: gallery = {
  id: 0,
  title: "",
  description: "",
  img_url: "",
  tags: "",
  date: "",
};

export const selectedGallery = atom<gallery>({ 
  key: 'SelectedGallery',
  default: defaultGallery,
});

////
export const galleriesQuery = selector({
  key: 'GalleriesQuery',
  get: async () => {
    const gallerieList = galleries();
    if(!gallerieList) return null;
    return gallerieList;
  },
});

export const cardByGallIdQuery = selectorFamily({
  key: 'CardByGallIdQuery',
  get: (id: number) => async ({get}) => {
    get(userId);
    get(userAmount);
    const response = await cardByGallId(id);
    if(!response) return null;
    return response;
  },
});

export const addCardByGallIdQuery = selectorFamily({
  key: 'AddCardByGallIdQuery',
  get: (id: number) => async ({get}) => {
    get(userId);
    get(userAmount);
    const response = await addCardByGallId(id);
    if(!response) return null;
    return response;
  },
});

export const stakeQuery = selectorFamily({
  key: 'StakeApproveQuery',
  get: (param: {id: number, unlockTime: number}) => async () => {
    const response = await stake(param.id, param.unlockTime);
    if(!response) return null;
    return response;
  },
});

export const addCardRegiQuery = selectorFamily({
  key: 'AddCardRegiQuery',
  get: (param: {gallery_id: number, nft_id: number, nft_end_time: string}) => async ({get}) => {
    get(userId);
    const response = await addCardRegi(param.gallery_id, param.nft_id, param.nft_end_time);
    if(!response) return null;
    return response;
  },
});

//
export const getGallByIdQuery = selectorFamily({
  key: 'GetGallByIdQuery',
  get: (gallId: number) => async ({get}) => {
    const response = get(galleriesQuery);
    if(!response) return null;
    return response.data.data.gallerys[gallId-1];    
  },
});