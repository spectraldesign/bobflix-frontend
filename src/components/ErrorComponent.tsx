import { Button, Flex, Text } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../App";

export default function ErrorComponent({ error }: { error: string }) {
    const { setSearch } = useContext(SearchContext)
    const navigate = useNavigate();
    return (
        <Flex w="100%" h="65vh" align="center" justify="center" direction={"column"}>
            <Text c="red" fs="xl" fw="bold">{error}</Text>
            <Button mt={20} variant="outline" rightSection={<IconReload size={20} />}
                onClick={() => {
                    setSearch('');
                    navigate('/');
                }}>Go Back</Button>
        </Flex>
    )
}