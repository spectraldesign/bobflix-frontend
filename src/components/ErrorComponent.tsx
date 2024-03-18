import { Button, Flex, Text } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

export default function ErrorComponent({ error }: { error: string }) {
    return (
        <Flex w="100%" h="65vh" align="center" justify="center" direction={"column"}>
            <Text c="red" fs="xl" fw="bold">{error}</Text>
            <Button mt={20} variant="outline" rightSection={<IconReload size={20} />}
                onClick={() => {
                    window.location.reload();
                }}>Retry</Button>
        </Flex>
    )
}