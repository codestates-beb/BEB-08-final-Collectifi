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