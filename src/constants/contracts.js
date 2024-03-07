import { ethers } from "ethers";
import ABI from "./abi.json";

export const getProposalsContract = (provider) => {
  return new ethers.Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    ABI,
    provider
  );
};
