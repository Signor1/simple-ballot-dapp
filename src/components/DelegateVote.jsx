import { Box, Card, Flex, Text, TextField } from "@radix-ui/themes"
import { useState } from "react"
import { toast } from "react-toastify"
import { isSupportedChain } from "../utils"
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { isAddress } from "ethers"
import { getProvider } from "../constants/provider"
import { getProposalsContract } from "../constants/contracts"


const DelegateVote = () => {

    const [address, setAddress] = useState("")

    const { chainId, address: chairPerson } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    const handleDelegate = async (to) => {
        //checking the network
        if (!isSupportedChain(chainId)) return toast.error("Wrong network !", { position: "top-right" });

        //checking for valid address
        if (!isAddress(to))
            return toast.error("Invalid Address !", {
                position: "top-right",
            });

        //checking for zero address
        if (to === "0x0000000000000000000000000000000000000000")
            return toast.error("You can not delegate to the zero address !", {
                position: "top-right",
            });

        //checking for self delegation
        if (to === chairPerson)
            return toast.error("You can not delegate yourself !", {
                position: "top-right",
            });


        const readWriteProvider = getProvider(walletProvider);

        const signer = await readWriteProvider.getSigner();

        const contract = getProposalsContract(signer);

        try {
            const delegation = await contract.delegate(to);

            console.log("delegation: ", delegation);

            const receipt = await delegation.wait();

            console.log("receipt: ", receipt);

            if (receipt.status) {
                setAddress("");
                return toast.success("Delegation successful !", { position: "top-right" });
            }

            toast.error("Delegation failed !", { position: "top-right" });

            setAddress("");

        } catch (error) {
            console.log(error);

            toast.error(error.reason, { position: "top-right" });

            setAddress("");
        }
    }

    return (
        <Card style={{ maxWidth: 425 }}>
            <Flex gap="3" align="center">

                <Box width={`100%`}>
                    <Flex direction={"column"} gap={`3`} >
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Delegate&apos;s Address
                            </Text>
                            <TextField.Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter address"
                            />
                        </label>
                        <button onClick={() => handleDelegate(address)} className="text-sky-100 py-2 bg-sky-500">Add Delegate</button>
                    </Flex>
                </Box>
            </Flex>
        </Card>
    )
}

export default DelegateVote