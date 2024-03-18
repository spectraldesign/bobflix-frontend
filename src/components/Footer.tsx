import { ActionIcon, Flex, MantineColorScheme, Text, rgba } from "@mantine/core";
import { IconMoon, IconSun } from '@tabler/icons-react';
import "./styles/Header.css";

export default function Footer({ colorScheme, setColorScheme }: { colorScheme: string, setColorScheme: (value: MantineColorScheme) => void }) {
    return (
        <Flex
            justify="space-between"
            align="center"
            style={{
                background: rgba("0, 0, 0", 0.2),
                gridArea: "footer",
                overflow: "hidden",
                paddingRight: "20px",
                paddingLeft: "20px",
                zIndex: 1
            }}
            h={"100%"}
        >
            <ActionIcon
                onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
            >
                {
                    colorScheme === 'light' ?
                        <IconMoon size={30} />
                        :
                        <IconSun size={30} />
                }
            </ActionIcon>
            <Flex
                h={"100%"}
                direction={"column"}
                align={"start"}
                ta={"center"}
            >
                <Text fw={500}>Source code</Text>
                <a href="https://github.com/spectraldesign/Bobflix-Frontend">Frontend</a>
                <a href="https://github.com/OnealLane/BobFlix-Backend">Backend</a>
            </Flex>
            <Flex
                h={"100%"}
                direction={"column"}
                align={"start"}
                ta={"center"}
                display={{ base: "none", xs: "flex" }}
            >
                <Text fw={500}>Contributors</Text>
                <Flex
                    h={"70px"}
                    direction={"column"}
                    align={"start"}
                    ta={"center"}
                    wrap={"wrap"}
                >
                    <a style={{ marginRight: "20px" }} href="https://github.com/OnealLane">Oneal Didrik Ferkingstad Lane</a>
                    <a style={{ marginRight: "20px" }} href="https://github.com/StianNordvik">Stian Andreas Ytterstad Nordvik</a>
                    <a href="https://github.com/spectraldesign">Skjalg Eide Hodneland</a>
                </Flex>
            </Flex>
        </Flex>
    )
}