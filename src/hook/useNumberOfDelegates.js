import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { wssProvider } from "../constants/provider";

const useNumberOfDelegates = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const filter = {
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      topics: [ethers.id("DelegateChanged(address,address,uint256,uint256)")],
    };

    wssProvider.getLogs({ ...filter, fromBlock: 5467475 }).then((events) => {
      setValue(events.length);
    });

    const trackingNumOfDelegates = (logs) => {
      console.log("tracking Num Of Delegates: ", logs);
    };

    wssProvider.on(filter, trackingNumOfDelegates);

    return () => wssProvider.off(filter, trackingNumOfDelegates);
  }, []);

  return value;
};

export default useNumberOfDelegates;
