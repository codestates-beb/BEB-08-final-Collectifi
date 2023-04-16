export const sendTx = async (from: string, to: string, data: string)=> {  
  if(!window.ethereum) return null;
  //await window.ethereum.request({ method: 'eth_requestAccounts' });
  try {
    const result = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: from,
        to: to,      
        data: data
      }],
    });    
    return result;
  } catch (e) {
    console.log("sendTx err:", e);
    return null;
  }  
}