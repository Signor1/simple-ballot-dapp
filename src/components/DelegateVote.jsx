import { Box, Flex, Text, TextField } from "@radix-ui/themes"
import { useState } from "react"
import useDelegate from "../hook/useDelegate"


const DelegateVote = () => {

    const [address, setAddress] = useState("")

    const handleDelegate = useDelegate(address);

    return (
        <div className="w-full bg-sky-100 p-6 rounded-md">
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
                        <button onClick={() => handleDelegate(address)} className="text-sky-100 py-2 bg-sky-600 rounded-md text-sm">Add Delegate</button>
                    </Flex>
                </Box>
            </Flex>
        </div>
    )
}

export default DelegateVote