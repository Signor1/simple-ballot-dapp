import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { wssProvider } from "../constants/provider";

const useNumberOfVoters = () => {
  const [value, setValue] = useState(0);

  //   const contract = getProposalsContract(wssProvider);

  const trackingvoters = useCallback(() => {
    setValue((prevValue) => prevValue + 1);
  }, []);

  useEffect(() => {
    const filter = {
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      topics: [ethers.id("GiveRightToVote(address,uint256)")],
    };

    wssProvider.getLogs({ ...filter, fromBlock: 5470625 }).then((events) => {
      setValue(events.length + 1);
    });

    const provider = new ethers.WebSocketProvider(
      import.meta.env.VITE_WEB_SOCKET_RPC_URL
    );

    provider.on(filter, trackingvoters);

    return () => provider.off(filter, trackingvoters);
  }, [trackingvoters]);

  return value;
};

export default useNumberOfVoters;
