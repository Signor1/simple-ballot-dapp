import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { toast } from "react-toastify";
import { getProvider } from "../constants/provider";
import { getProposalsContract } from "../constants/contracts";

const useHandleVote = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (id) => {
      if (!isSupportedChain(chainId))
        return toast.error("Wrong network !", { position: "top-right" });

      const readWriteProvider = getProvider(walletProvider);

      const signer = await readWriteProvider.getSigner();

      const contract = getProposalsContract(signer);

      try {
        const transaction = await contract.vote(id);

        console.log("transaction: ", transaction);

        const receipt = await transaction.wait();

        console.log("receipt: ", receipt);

        if (receipt.status) {
          return toast.success("Voted successfully !", {
            position: "top-right",
          });
        }

        toast.error("Voting failed !", { position: "top-right" });
      } catch (error) {
        console.log(error);
        let errorText;
        if (error.reason === "Has no right to vote") {
          errorText = "You have not right to vote";
        } else if (error.reason === "Already voted.") {
          errorText = "You have already voted";
        } else {
          errorText = "An unknown error occured";
        }

        toast.error(errorText, { position: "top-right" });
      }
    },
    [chainId, walletProvider]
  );
};

export default useHandleVote;
