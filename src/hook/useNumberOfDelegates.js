import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { wssProvider } from "../constants/provider";

const useNumberOfDelegates = () => {
  const [value, setValue] = useState(0);

  const trackingdelegates = useCallback(() => {
    setValue((prevValue) => prevValue + 1);
  }, []);

  useEffect(() => {
    const filter = {
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      topics: [ethers.id("Delegate(address,address,uint256,uint256)")],
    };

    wssProvider.getLogs({ ...filter, fromBlock: 5470625 }).then((events) => {
      setValue(events.length);
    });

    const provider = new ethers.WebSocketProvider(
      import.meta.env.VITE_WEB_SOCKET_RPC_URL
    );

    provider.on(filter, trackingdelegates);

    return () => provider.off(filter, trackingdelegates);
  }, [trackingdelegates]);

  return value;
};

export default useNumberOfDelegates;
