export interface ResponseData {
  message: string;
  data?: object;
}

export interface User {
  id: number;
  nickname: string;
  address: string;
  posts: Post[];
  comments: Comment[];
  token_amount: number;
  eth_amount: number;
  nfts: Nft[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  owner: User;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  owner: User;
  content: string;
}
