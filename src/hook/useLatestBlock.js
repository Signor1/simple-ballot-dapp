import { useEffect, useState } from "react";
import { wssProvider } from "../constants/provider";

export function useLatestBlock() {
  const [blockNumber, setBlockNumber] = useState(undefined);

  useEffect(() => {
    console.log("wssProvider: ", wssProvider);

    const onBlock = (newBlockNumber) => setBlockNumber(newBlockNumber);

    wssProvider.on("block", onBlock);

    return () => {
      wssProvider.off("block", onBlock);
    };
  }, []);

  return blockNumber;
}
