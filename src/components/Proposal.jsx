import { Avatar, Flex, Box, Text } from "@radix-ui/themes"


const Proposal = ({ id, name, voteCount, handleVote }) => {
    return (
        <div className="w-full bg-sky-100 p-4 rounded-md">
            <Flex gap="3" align="center" width={`100%`}>
                <Avatar
                    size="4"
                    radius="full"
                    fallback={id}
                />
                <Box width={`100%`}>
                    <Flex width={`100%`} direction={'column'} gap={'1'}>
                        <Flex width={`100%`} justify={"between"} align={"center"} gap={`4`} >
                            <Text as="div" size="2" weight="bold">
                                {name}
                            </Text>
                            <button className="bg-sky-600 text-white rounded py-0.5 text-sm px-6" onClick={() => handleVote(id)}>
                                Vote
                            </button>
                        </Flex>
                        <Text as="div" size="2" color="gray">
                            Number of Vote - {voteCount}
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </div>
    )
}

export default Proposal