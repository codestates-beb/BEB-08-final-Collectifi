import { useEffect } from "react";
import { useRecoilCallback } from 'recoil';
import { userAddr, userId, userNickname, userAmount, checkLoginQuery } from '../modules/atom';

export default function Init () {
  const init = useRecoilCallback(({ snapshot, set }) => async () => {
    const result = await snapshot.getPromise(checkLoginQuery);
    if(!result) 
      return;
    set(userAddr, result.address);
    set(userId, result.id);
    set(userNickname, result.nickname);
    set(userAmount, result.token_amount);  
    console.log("init", result);
  });

  useEffect(() => {
    init();
  }, []);

  return null;
}