import { Avatar, Flex, Text, rgba } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <Flex
            w={"100%"}
            h={100}
            justify="space-between"
            align="center"
            style={{
                background: rgba("0, 0, 0", 0.2),
                gridArea: "header",
                overflow: "hidden",
            }}
        >
            <Text
                size="50"
                fw={700}
                ml={40}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 154 }}
                style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(80,78,218, 0.4))'
                    e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(80,78,218, 0))'
                    e.currentTarget.style.transform = 'scale(1)'
                }}
                onClick={() => navigate('/')}
            >
                BOBFLIX
            </Text>
            <Avatar
                variant="transparent"
                radius="xs"
                size="xl"
                mr={20}
                src=""
                color="indigo"
                style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                }}
                onClick={() => navigate('/profile')}
            />
        </Flex>
    )
}