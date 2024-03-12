import { useCallback, useEffect, useState } from "react";
import { getProposalsContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/provider";
import { decodeBytes32String, ethers } from "ethers";

export const useProposals = () => {
  const [proposals, setProposals] = useState({
    loading: true,
    data: [],
  });

  const proposalUpdate = useCallback((log) => {
    console.log("proposalUpdate: ", log);
  }, []);

  useEffect(() => {
    const contract = getProposalsContract(readOnlyProvider);

    contract
      .getAllProposals()
      .then((res) => {
        const converted = res.map((item) => ({
          name: decodeBytes32String(item.name),
          voteCount: item.voteCount,
        }));
        // console.log("x : ", converted);
        setProposals({
          loading: false,
          data: converted,
        });
      })
      .catch((err) => {
        console.error(err);
        setProposals((prev) => ({ ...prev, loading: false }));
      });

    const filter = {
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      topics: [ethers.id("Vote(address,uint256,uint256)")],
    };

    const provider = new ethers.WebSocketProvider(
      import.meta.env.VITE_WEB_SOCKET_RPC_URL
    );

    provider.on(filter, proposalUpdate);

    return () => provider.off(filter, proposalUpdate);
  }, [proposalUpdate]);

  return proposals;
};
