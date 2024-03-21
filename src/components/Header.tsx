import { Avatar, Flex, Text, rgba } from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JwtContext, SearchContext, UserContext } from "../App";
import "./styles/Header.css";

export default function Header() {
    const { user } = useContext(UserContext)
    const { setJwt } = useContext(JwtContext)
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
            <Flex justify={"center"} align={"center"}>
                <Text style={{ cursor: "pointer" }} component="a" onClick={() => {
                    if (user) {
                        setJwt('');
                        navigate('/');
                        window.location.reload();
                    }
                    else {
                        navigate('/login');
                    }
                }}>
                    {user ? "Log out" : "Log in"}
                </Text>
                <Avatar
                    className="header-avatar"
                    variant="transparent"
                    radius="xl"
                    size="lg"
                    mr={20}
                    ml={20}
                    src={user?.imgUrl ?? ''}
                    color="indigo"
                    onClick={() => {
                        setSearch('');
                        navigate('/profile');
                    }}
                />
            </Flex>
        </Flex>
    )
}