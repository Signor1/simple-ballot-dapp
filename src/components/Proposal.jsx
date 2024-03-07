import { Avatar, Card, Flex, Box, Text } from "@radix-ui/themes"


const Proposal = ({ id, name, voteCount, handleVote }) => {
    return (
        <Card style={{ maxWidth: 425 }} >
            <Flex gap="3" align="center">
                <Avatar
                    size="4"
                    radius="full"
                    fallback={id}
                />
                <Box>
                    <Flex direction={'column'} gap={'1'}>
                        <Flex justify={"between"} align={"center"} gap={`4`} >
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
        </Card>
    )
}

export default Proposal