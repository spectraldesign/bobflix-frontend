import { Avatar, Button, Flex, LoadingOverlay, PasswordInput, Text, TextInput } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { JwtContext, UserContext } from "../App";
import { BobflixAPI } from "../api/Bobflix";

export default function Login() {
    const { setJwt } = useContext(JwtContext);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
        if (!event.currentTarget.value.includes('@')) {
            setEmailError('Must be a valid email!')
        }
        else {
            setEmailError('')
        }
    }


    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const submitLogin = async () => {

        try {
            if (!email || !password) {
                return toast.error('Please fill in email and password')
            }

            setLoading(true);
            const response = await BobflixAPI.loginUser(email, password);

            if (response.success) {
                setJwt(response.data.token);
                navigate('/')
                toast.success('Successful login')
            } else {
                toast.error(response.errorMessage)
            }

        } catch (error) {
            toast.error('some error message')
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user,navigate])

    return (
        <div className="main">
            <Flex justify="center" align="center" direction="column" ta="center" w={"100%"} h={"100%"}>
                <LoadingOverlay visible={loading} />
                <Avatar
                    variant="transparent"
                    radius="xs"
                    size="150"
                    src=""
                    color="indigo"
                />
                <Text size="xl" fw={700} mb={30}>Login</Text>
                <Flex justify="center" align="center" direction="column" w={300}>
                    <TextInput
                        variant="filled"
                        label="Email"
                        withAsterisk
                        placeholder="Your email"
                        w={"100%"}
                        mb={10}
                        onChange={handleEmailChange}
                        error={emailError}

                    />
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        placeholder="Your password"
                        w={"100%"}
                        mt={10}
                        onChange={handlePasswordChange}

                    />
                    <Button variant="light" color="indigo" w={150} mt={20} onClick={submitLogin}>Login</Button>
                    <Text mt={10} fs="xs">Don't have an account? <Text style={{ cursor: "pointer" }} component="a" onClick={() => navigate('/register')}>Register</Text></Text>
                </Flex>
            </Flex>
        </div >
    )
}