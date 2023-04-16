import axios from "axios";
import { SERVERURL, ISCONNECT } from "../atom";
import { userInfo  as userInfoData } from "../../data/mypage";

export const userInfo = async (id: number) => {
  console.log("userInfo", id)
  if(!ISCONNECT) return userInfoData;
  const options = {
    method: 'GET',
    url: `${SERVERURL}/user/${id}`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  try {
    const data = await axios(options);
    return data;
  } catch (err) {
    console.log("userInfo err: ",err);
    return null;
  }
  
  // const data = await axios(options);
  // return data;
}

export const editNickname = async (nickname: string) => {
  //if(!ISCONNECT) return sellCardData;
  const options = {
    method: 'POST',
    url: `${SERVERURL}/user/edit`,
    headers: {accept: 'application/json'},
    withCredentials: true,
    data: {
      "nickname" : nickname,
    }
  };

  try {
    const data = await axios(options);
    return data;
  } catch (err) {
    console.log("editNickname err: ",err);
    return null;
  }
}