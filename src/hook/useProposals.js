import { useEffect, useState } from "react";
import { getProposalsContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/provider";
import { decodeBytes32String, ethers } from "ethers";

export const useProposals = () => {
  const [proposals, setProposals] = useState({
    loading: true,
    data: [],
  });

  const abicoder = ethers.AbiCoder.defaultAbiCoder();

  const handleVoteEvent = (log) => {
    console.log("vote: ", log);
    const encodedProposalIndex = log.topics[2];
    const encodedVoteWeight = log.data;

    const decodedProposalIndex = abicoder.decode(
      ["uint256"],
      encodedProposalIndex
    );

    const decodedVoteWeight = abicoder.decode(["uint256"], encodedVoteWeight);

    console.log("got here");

    const index = Number(decodedProposalIndex[0]);
    const voteWeight = Number(decodedVoteWeight[0]);

    console.log(index, voteWeight);

    setProposals((prev) => ({
      ...prev,
      data: prev.data.map((item, id) =>
        index === id
          ? { ...item, voteCount: item.voteCount + voteWeight }
          : item
      ),
    }));

    console.log("worked!");
  };

  // const handleVoteEventCallback = useCallback(
  //   (log) => {
  //     console.log("vote: ", log);
  //     const encodedProposalIndex = log.topics[2];
  //     const encodedVoteWeight = log.data;

  //     const decodedProposalIndex = ethers.AbiCoder.defaultAbiCoder().decode(
  //       ["uint256"],
  //       encodedProposalIndex
  //     );

  //     const decodedVoteWeight = ethers.AbiCoder.defaultAbiCoder().decode(
  //       ["uint256"],
  //       encodedVoteWeight
  //     );

  //     console.log("got here");

  //     const index = Number(decodedProposalIndex[0]);
  //     const voteWeight = Number(decodedVoteWeight[0]);

  //     console.log(index, voteWeight);

  //     const newData = [...proposals.data];

  //     newData[index].voteCount += voteWeight;

  //     setProposals((prev) => ({ ...prev, data: newData }));

  //     console.log("worked!");
  //   },
  //   [proposals.data]
  // );

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

    provider.on(filter, handleVoteEvent);

    return () => provider.off(filter, handleVoteEvent);
  }, [handleVoteEvent]);

  return proposals;
};
