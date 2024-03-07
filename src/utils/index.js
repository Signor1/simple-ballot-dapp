import { SUPPORTED_CHAIN_ID } from "../connection";

export const isSupportedChain = (chainId) =>
  Number(chainId) === SUPPORTED_CHAIN_ID;
