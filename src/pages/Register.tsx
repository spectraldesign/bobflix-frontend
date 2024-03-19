import { Flex, Text } from "@mantine/core";
import CustomPasswordInput from "../components/CustomPasswordInput";

export default function Register() {
    return (
        <div className="main">
            <Flex justify="center" align="center" direction="column" ta="center" w={"100%"} h={"100%"}>
                <Text size="xl" fw={700} mb={10}>Register user</Text>
                <Flex justify="center" align="center" direction="column">
                    <CustomPasswordInput />
                </Flex>
            </Flex>
        </div>
    )
}