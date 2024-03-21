import { Avatar, Button, Divider, Flex, LoadingOverlay, PasswordInput, Text, TextInput } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { JwtContext, UserContext } from "../App";
import { BobflixAPI } from "../api/Bobflix";
import CustomPasswordInput from "../components/CustomPasswordInput";

export default function Register() {
    const { user } = useContext(UserContext)
    const { setJwt } = useContext(JwtContext)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
        if (!event.currentTarget.value.includes('@')) {
            setEmailError('Must be a valid email!')
        }
        else {
            setEmailError('')
        }
    }

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value)
        if (event.currentTarget.value.length < 3) {
            setUsernameError('Username needs to be minimum 3 characters!')
        }
        else {
            setUsernameError('')
        }
    }

    const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.currentTarget.value)
        if (event.currentTarget.value !== password) {
            setConfirmPasswordError('Passwords must match!')
        }
        else {
            setConfirmPasswordError('')
        }
    }

    const submitRegister = () => {
        if (!email || !username || !password || !confirmPassword) {
            return toast.error('Please fill in all the required fields!')
        }
        if (emailError || usernameError || confirmPasswordError || passwordError) {
            const errorString = `
            ${emailError ? emailError : ''}
            ${usernameError ? usernameError : ''}
            ${passwordError ? passwordError : ''}
            ${confirmPasswordError ? confirmPasswordError : ''}
            `
            toast.error(errorString)
            return toast.error('Please fix the errors before submitting!')
        }
        setLoading(true)
        BobflixAPI.registerUser(email, username, password).then((res) => {
            if (!res.success) {
                toast.error(res.errorMessage)
            }
            else {
                toast.success('User registered successfully!')
                setJwt(res.data.token)
                navigate('/')
            }
            setLoading(false)
            return
        })

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
                    className="header-avatar"
                    variant="transparent"
                    radius="xs"
                    size="xl"
                    src=""
                    color="indigo"
                />
                <Text size="xl" fw={700} mb={30}>Register user</Text>
                <Flex justify="center" align="center" direction="column" w={300}>
                    <TextInput
                        variant="filled"
                        label="Email"
                        withAsterisk
                        placeholder="Your email"
                        w={"100%"}
                        mb={10}
                        onChange={(event) => handleEmailChange(event)}
                        error={emailError}
                    />
                    <TextInput
                        variant="filled"
                        label="Username"
                        withAsterisk
                        placeholder="Your username"
                        w={"100%"}
                        mb={10}
                        onChange={(event) => handleUserNameChange(event)}
                        error={usernameError}
                    />
                    <Divider
                        w={300}
                        my={"md"} label="PASSWORD"
                        labelPosition={"center"}
                        c="white"
                        size={"xs"}
                    />
                    <CustomPasswordInput value={password} setValue={setPassword} setError={setPasswordError} />
                    <PasswordInput
                        withAsterisk
                        label="Confirm password"
                        placeholder="Confirm your password"
                        w={"100%"}
                        mt={10}
                        onChange={(event) => handleConfirmPassword(event)}
                        error={confirmPasswordError}
                    />
                    <Button variant="light" color="indigo" w={150} mt={20} onClick={() => submitRegister()}>Register</Button>
                    <Text mt={10} fs="xs">Already have an account? <Text style={{ cursor: "pointer" }} component="a" onClick={() => navigate('/login')}>Login</Text></Text>
                </Flex>
            </Flex>
        </div >
    )
}