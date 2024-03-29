import { Flex, TextInput } from "@mantine/core";
import { useContext } from "react";
import { SearchContext } from "../App";

export default function SearchBox() {
    const { setSearch } = useContext(SearchContext);

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }
    return (
        <Flex justify="center" align="center" w={{ base: 150, xs: 200, sm: 250, md: 350 }} mb={20}>
            <TextInput
                placeholder="Search for a movie"
                variant="filled"
                w="100%"
                ta={"center"}
                radius={10}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit(e);
                    }
                }}
            />
        </Flex>
    )
}
