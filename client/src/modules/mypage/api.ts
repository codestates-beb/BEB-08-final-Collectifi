import axios from "axios";
import { SERVERURL, ISCONNECT } from "../atom";
import { userInfo  as userInfoData } from "../../data/mypage";

export const userInfo = async (id: number) => {
  if(!ISCONNECT) return userInfoData;
  const options = {
    method: 'GET',
    url: `${SERVERURL}/user/${id}`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  const data = await axios(options);
  return data;

  // try {
  //   const data = await axios(options);
  //   return data;
  // } catch (err) {
  //   console.log("userInfo err: ",err);
  //   return null;
  // }
}