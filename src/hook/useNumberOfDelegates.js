import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { wssProvider } from "../constants/provider";

const useNumberOfDelegates = () => {
  const [value, setValue] = useState(0);

  const trackingdelegates = useCallback((log) => {
    console.log("tracking Num Of Delegates: ", log);
    setValue((prevValue) => prevValue + 1);
  }, []);

  useEffect(() => {
    const filter = {
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      topics: [ethers.id("Delegate(address,address,uint256,uint256)")],
    };

    wssProvider.getLogs({ ...filter, fromBlock: 5467475 }).then((events) => {
      setValue(events.length);
    });

    wssProvider.on(filter, trackingdelegates);

    return () => wssProvider.off(filter, trackingdelegates);
  }, [trackingdelegates]);

  return value;
};

export default useNumberOfDelegates;
