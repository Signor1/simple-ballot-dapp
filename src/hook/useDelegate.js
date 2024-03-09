import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { isAddress } from "ethers";
import { getProvider } from "../constants/provider";
import { getProposalsContract } from "../constants/contracts";
import { toast } from "react-toastify";

const useDelegate = (address) => {
  const { chainId, address: chairPerson } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    //checking the network
    if (!isSupportedChain(chainId))
      return toast.error("Wrong network !", { position: "top-right" });

    //checking for valid address
    if (!isAddress(address))
      return toast.error("Invalid Address !", {
        position: "top-right",
      });

    //checking for zero address
    if (address === "0x0000000000000000000000000000000000000000")
      return toast.error("You can not delegate to the zero address !", {
        position: "top-right",
      });

    //checking for self delegation
    if (address === chairPerson)
      return toast.error("You can not delegate yourself !", {
        position: "top-right",
      });

    const readWriteProvider = getProvider(walletProvider);

    const signer = await readWriteProvider.getSigner();

    const contract = getProposalsContract(signer);

    try {
      const delegation = await contract.delegate(address);

      console.log("delegation: ", delegation);

      const receipt = await delegation.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast.success("Delegation successful !", {
          position: "top-right",
        });
      }

      toast.error("Delegation failed !", { position: "top-right" });
    } catch (error) {
      console.log(error);

      toast.error(error.reason, { position: "top-right" });
    }
  }, [chainId, walletProvider, address, chairPerson]);
};

export default useDelegate;
