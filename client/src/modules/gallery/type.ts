import { nft } from "../type";

export type gallery = {
  id: number;
  title: string;
  description: string;
  img_url: string;
  tags: string;
  date: string;
}

export type nftGallerys = {
  id: number;
  gallery_id: number;
  nft_id: number;
  isWithdraw: boolean;
  nft_end_time: string; //date
}

export type galleryDetail = {  
  Nft: nft &
  {
    User: { nickname: string }
  }
} & nftGallerys;

export type addCard = {
  User: { nickname: string };
} & nft;

export type stakeData = {
  approve: string;
  erc721ca: string;
  gallca: string;
  stake: string;
}