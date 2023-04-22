import { gallery, nftGallerys } from '../gallery/type';
import { nft } from '../type';
export type user = {
  id: number;
  nickname: string;
  address: string;
  token_amount: number;
  referral: string;
}

export type myGallery = {
  Nft_galleries:[
    Gallery: {
      Gallery:gallery
    } & nftGallerys
  ]
} & nft

export type myCard = {
  Nft_galleries: nftGallerys[]
} & nft