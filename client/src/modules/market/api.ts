import axios from "axios";
import { SERVERURL, ISCONNECT } from "../atom";
import { sellCard  as sellCardData } from "../../data/market";

export const sellCard = async () => {
  if(!ISCONNECT) return sellCardData;
  const options = {
    method: 'GET',
    url: `${SERVERURL}/market`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  const data = await axios(options);
  return data;
}

export const CardById = async (id: number) => {
  if(!ISCONNECT) {  
    const dummy = sellCardData.data.data.filter((el) => el.id === id);
    return {"data": {"data": {...dummy[0]}}};
  }
  const options = {
    method: 'GET',
    url: `${SERVERURL}/market/nft/${id}`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  const data = await axios(options);
  return data;
}