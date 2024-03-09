import { ethers } from "ethers";
import { useEffect, useState } from "react";

export function useLatestBlock() {
  const [blockNumber, setBlockNumber] = useState(undefined);

  useEffect(() => {
    const wssProvider = new ethers.WebSocketProvider(
      import.meta.env.VITE_WEB_SOCKET_RPC_URL
    );

    console.log("wssProvider: ", wssProvider);

    const onBlock = (newBlockNumber) => setBlockNumber(newBlockNumber);

    wssProvider.on("block", onBlock);

    return () => {
      wssProvider.off("block", onBlock);
    };
  }, []);

  return blockNumber;
}
