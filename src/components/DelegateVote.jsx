import { Box, Card, Flex, Text, TextField } from "@radix-ui/themes"


const DelegateVote = ({ handleToggle }) => {
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
                                defaultValue="0x09shid7832nmhvjysq32jkj"
                                placeholder="Enter address"
                            />
                        </label>
                        <button onClick={handleToggle} className="text-sky-100 py-2 bg-sky-500">Add Delegate</button>
                    </Flex>
                </Box>
            </Flex>
        </Card>
    )
}

export default DelegateVote