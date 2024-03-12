import { useEffect, useState } from "react";
import { getProposalsContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/provider";
import { decodeBytes32String } from "ethers";

export const useProposals = () => {
  const [proposals, setProposals] = useState({
    loading: true,
    data: [],
  });

  // const blockNumber = useLatestBlock();

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
  }, []);

  return proposals;
};
