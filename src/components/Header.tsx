import { Flex, rgba } from "@mantine/core";

export default function Header() {
    return (
        <Flex
            w={"100%"}
            h={100}
            justify="center"
            align="center"
            style={{
                background: rgba("0, 0, 0", 0.2),
                gridArea: "header",
            }}
        >
            <h1>Header</h1>
        </Flex>
    )
}