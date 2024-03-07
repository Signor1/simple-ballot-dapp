import { ethers } from "ethers";

//when wallet is not connected, connects to the sepolia rpc
export const readOnlyProvider = new ethers.JsonRpcProvider(
  import.meta.env.VITE_RPC_URL
);

//browser wallet is connect (read-write provider)
export const getProvider = (provider) => new ethers.BrowserProvider(provider);
