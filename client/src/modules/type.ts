export type nft = {
  id: number;
  token_id: number;
  user_id: number;
  player: string;
  season: string;
  team: string;
  card_color: number;
  price: number;
  selling_price: number;
  img_url: string;
  isSell: boolean;
  team_record: string;
  man_record: string;
}

export type post = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string; //Date
  views: number;
}