import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { wssProvider } from "../constants/provider";

const useNumberOfVoters = () => {
  const [value, setValue] = useState(0);

  const trackingvoters = useCallback((log) => {
    console.log("testing event: ", log);
    setValue((prevValue) => prevValue + 1);
  }, []);

  useEffect(() => {
    const filter = {
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      topics: [ethers.id("GiveRightToVote(address,uint256)")],
    };

    wssProvider.getLogs({ ...filter, fromBlock: 5467475 }).then((events) => {
      setValue(events.length + 1);
    });

    wssProvider.on(filter, trackingvoters);

    return () => wssProvider.off(filter, trackingvoters);
  }, [trackingvoters]);

  return value;
};

export default useNumberOfVoters;
