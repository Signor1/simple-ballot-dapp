import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { wssProvider } from "../constants/provider";

const useNumberOfVoters = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const filter = {
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      topics: [ethers.id("GiveRightToVote(address,uint256)")],
    };

    wssProvider.getLogs({ ...filter, fromBlock: 5467475 }).then((events) => {
      setValue(events.length + 1);
    });
  }, []);

  return value;
};

export default useNumberOfVoters;
