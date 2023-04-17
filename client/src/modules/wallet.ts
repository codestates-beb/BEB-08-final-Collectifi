export const sendTx = async (nonce: string, from: string, to: string, data: string)=> {  
  if(!window.ethereum) return null;
  //await window.ethereum.request({ method: 'eth_requestAccounts' });
  try {
    const result = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: from,
        to: to,      
        data: data,
        nonce: nonce
      }],
    });    
    return result;
  } catch (e) {
    console.log("sendTx err:", e);
    return null;
  }  
}

export const getTransactionCount = async (address: string) => {
  if (!window.ethereum) return null;
  try {
    const result = await window.ethereum.request({
      method: 'eth_getTransactionCount',
      params: [address, 'latest'],
    });
    return result;
  } catch (e) {
    console.log("getTransactionCount err:", e);
    return null;
  }
}