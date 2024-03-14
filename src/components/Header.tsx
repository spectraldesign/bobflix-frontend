import { Avatar, Flex, Text, rgba } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./styles/Header.css"

export default function Header() {
    const navigate = useNavigate();
    return (
        <Flex
            w={"100%"}
            h={80}
            justify="space-between"
            align="center"
            style={{
                background: rgba("0, 0, 0", 0.2),
                gridArea: "header",
                overflow: "hidden",
            }}
        >
            <Text
                className="header-logo-text"
                size="50"
                fw={700}
                ml={40}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 154 }}
                onClick={() => navigate('/')}
            >
                BOBFLIX
            </Text>
            <Avatar
                className="header-avatar"
                variant="transparent"
                radius="xs"
                size="xl"
                mr={20}
                src=""
                color="indigo"
                onClick={() => navigate('/profile')}
            />
        </Flex>
    )
}