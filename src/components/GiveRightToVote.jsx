import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes"
import { useState } from "react"
import useGiveRightToVote from "../hook/useGiveRightToVote"


const GiveRightToVote = () => {

    const [address, setAddress] = useState("")

    const handleGiveRightToVote = useGiveRightToVote(address);

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <button className="bg-sky-100 text-sm py-2 px-6 font-medium rounded-md text-sky-800">Add Vote</button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Vote</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Give right to vote
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Voter&apos;s Address
                        </Text>
                        <TextField.Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter address"
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleGiveRightToVote} className="text-sky-100 bg-sky-500">Add Voter</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default GiveRightToVote