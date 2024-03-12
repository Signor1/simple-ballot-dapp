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

const useGiveRightToVote = (address) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId))
      return toast.error("Wrong network !", {
        position: "top-right",
      });

    if (!isAddress(address))
      return toast.error("Invalid Address !", {
        position: "top-right",
      });

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getProposalsContract(signer);

    try {
      const estimatedGas = await contract.giveRightToVote.estimateGas(address);
      // console.log("estimatedGas: ", estimatedGas);

      // const feeData = await readWriteProvider.getFeeData();

      // console.log("feeData: ", feeData);

      // const gasFee = estimatedGas * feeData.gasPrice;

      // console.log("estimated: ", gasFee);

      const transaction = await contract.giveRightToVote(address, {
        gasLimit: estimatedGas,
      });

      console.log("transaction: ", transaction);

      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast.success("giveRightToVote successfull !", {
          position: "top-right",
        });
      }

      toast.error("giveRightToVote failed !", {
        position: "top-right",
      });
    } catch (error) {
      // console.error("error: ", error);

      toast.error(`${error.message.slice(0, 20)}...`, {
        position: "top-right",
      });
    }
  }, [address, chainId, walletProvider]);
};

export default useGiveRightToVote;
