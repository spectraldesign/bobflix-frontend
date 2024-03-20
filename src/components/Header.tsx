import { Avatar, Flex, Text, rgba } from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../App";
import "./styles/Header.css";

export default function Header() {
    const { setSearch } = useContext(SearchContext)
    const navigate = useNavigate();
    return (
        <Flex
            w={"100%"}
            h={"100%"}
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
                onClick={() => {
                    setSearch('');
                    navigate('/');
                }}
            >
                BOBFLIX
            </Text>
            <p onClick={() => navigate('/register')}>register</p>
            <Avatar
                className="header-avatar"
                variant="transparent"
                radius="xs"
                size="xl"
                mr={20}
                src=""
                color="indigo"
                onClick={() => {
                    setSearch('');
                    navigate('/profile');
                }}
            />
        </Flex>
    )
}