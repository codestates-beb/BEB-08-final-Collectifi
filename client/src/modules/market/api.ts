import axios from "axios";
import { SERVERURL, ISCONNECT } from "../atom";
import { sellCard  as sellCardData } from "../../data/market";

export const sellCard = async () => {
  console.log("sellcard")
  if(!ISCONNECT) return sellCardData;
  const options = {
    method: 'GET',
    url: `${SERVERURL}/market`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  return await axios(options);
}

export const cardById = async (id: number) => {
  if(!ISCONNECT) {  
    const dummy = sellCardData.data.data.filter((el) => el.id === id);
    return {"data": {"data": {"nft": {...dummy[0]}}}};
  }
  const options = {
    method: 'GET',
    url: `${SERVERURL}/market/nft/${id}`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  return await axios(options);
}

export const txById = async (id: number) => {
  const options = {
    method: 'GET',
    url: `${SERVERURL}/market/nft/record/${id}`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  return await axios(options);
}

export const sellApprove = async (id: number) => {
  //if(!ISCONNECT) return sellCardData;
  const options = {
    method: 'GET',
    url: `${SERVERURL}/market/nftapprove/${id}`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  return await axios(options);
}

export const sellRegi = async (id: number, price: number) => {
  //if(!ISCONNECT) return sellCardData;
  console.log("sellRegi", id, price)
  const options = {
    method: 'POST',
    url: `${SERVERURL}/market/sell`,
    headers: {accept: 'application/json'},
    withCredentials: true,
    data: {
      "token_id": id,
      "selling_price": price
    }
  };

  try {
    const data = await axios(options);
    return data;
  } catch (err) {
    console.log("sellRegi err: ",err);
    return null;
  }
}

export const buyApprove = async (token_amount: number) => {
  //if(!ISCONNECT) return sellCardData;
  const options = {
    method: 'GET',
    url: `${SERVERURL}/market/tokenapprove/${token_amount}`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  return await axios(options);
}

export const buyCard = async (token_id: number, user_id: number, price: number) => {
  //if(!ISCONNECT) return sellCardData;
  const options = {
    method: 'POST',
    url: `${SERVERURL}/market/buy`,
    headers: {accept: 'application/json'},
    withCredentials: true,
    data: {
      "token_id": token_id,
      "user_id": user_id,
      "selling_price": price
    }
  };

  try {
    const data = await axios(options);
    return data;
  } catch (err) {
    console.log("buyCard err: ",err);
    return null;
  }
}