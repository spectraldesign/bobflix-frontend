import { Flex, Loader, Text } from "@mantine/core";

export default function LoadingComponent() {
    return (
        <Flex w="100%" h="65vh" align="center" justify="center" direction={"column"}>
            <Loader mb={10} />
            <Text>Loading...</Text>
        </Flex>
    )
}