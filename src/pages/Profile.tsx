import { Avatar, Button, Divider, FileButton, Flex, Table, Text, Tooltip } from "@mantine/core"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { JwtContext } from "../App"
import { BobflixAPI, UserType } from "../api/Bobflix"
import LoadingComponent from "../components/LoadingComponent"
import "../components/styles/Header.css"
export default function Profile() {
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [user, setUser] = useState(null as UserType | null)
    const [loading, setLoading] = useState(true)
    const { setJwt } = useContext(JwtContext)
    const navigate = useNavigate()
    const [rows, setRows] = useState<JSX.Element[]>([])


    useEffect(() => {
        if (BobflixAPI.hasValidJwt()) {
            BobflixAPI.getLoggedInUser().then((res) => {
                if (res.success) {
                    setUser(res.data)
                }
                else {
                    toast.error(res.errorMessage)
                }
                setLoading(false)
            })
        }
        else {
            setUser(null)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!user) {
            return
        }
        const temp = user.favouriteMovies.sort((a, b) => b.currentUserRating - a.currentUserRating).map((movie) => {
            return (
                <Table.Tr key={movie.imdbId}>
                    <Table.Td>{movie.title}</Table.Td>
                    <Table.Td>{movie.currentUserRating}</Table.Td>
                    <Table.Td>
                        <Button variant="transparent"
                            onClick={() => {
                                navigate(`/movie/${movie.imdbId}`)
                            }}>Go to movie</Button>
                    </Table.Td>
                </Table.Tr>
            )
        });
        setRows(temp)
    }, [user, navigate])

    useEffect(() => {
        if (profileImage) {
            console.log(profileImage)
            const reader = new FileReader()
            reader.readAsDataURL(profileImage)
            reader.onload = () => {
                BobflixAPI.setAvatar(reader.result as string).then((res) => {
                    if (res.success) {
                        toast.success("Avatar updated")
                        window.location.reload()
                    }
                    else {
                        toast.error(res.errorMessage)
                    }
                })
            }
        }

    }, [profileImage])

    console.log(user?.imgUrl)
    return (
        <div className="main">
            <Flex
                mih={50}
                gap="md"
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
                ta="center"
            >
                {
                    loading ? <LoadingComponent /> :
                        user ?
                            <>

                                <img className="coverimage" src={user.imgUrl ?? ''} alt="cover" />

                                <FileButton onChange={setProfileImage} accept="image/png, image/jpeg">
                                    {(props) =>
                                        <Tooltip label="Change avatar" position="bottom" offset={-20}>
                                            <Avatar
                                                className="header-avatar"
                                                variant="transparent"
                                                radius="xs"
                                                size={150}
                                                mb={20}
                                                src={user.imgUrl ?? ''}
                                                style={{ borderRadius: "50%" }}
                                                color="indigo"
                                                {...props}
                                            />
                                        </Tooltip>
                                    }
                                </FileButton>

                                <Divider
                                    w={{ base: 350, sm: 650, md: 700 }}
                                    my={"md"} label="INFO"
                                    labelPosition={"center"}
                                    c="white"
                                    size={"xs"}
                                    mt={-15}
                                    mb={-10}
                                />
                                <div className="profile-info">
                                    <Text size="xl"
                                        fw={900}
                                        variant="gradient"
                                        gradient={{ from: 'rgba(102, 156, 255, 1)', to: 'rgba(213, 171, 255, 1)', deg: 90 }}
                                    >
                                        {user.userName}
                                    </Text>
                                    <Text c="dimmed">{user.email}</Text>
                                </div>
                                <Divider
                                    w={{ base: 350, sm: 650, md: 700 }}
                                    my={"md"} label="MOVIES"
                                    labelPosition={"center"}
                                    c="white"
                                    size={"xs"}
                                    mt={-5}
                                    mb={-10}
                                />
                                <div className="profile-movies">
                                    <Text>Average rating: {user.avgRating}</Text>
                                    {
                                        user.favouriteMovies.length > 0 ?
                                            <Table
                                                highlightOnHover
                                                withTableBorder
                                                withColumnBorders
                                                w={{ base: 350, sm: 650, md: 700 }}
                                                ta={"center"}
                                            >
                                                <Table.Thead>
                                                    <Table.Tr>
                                                        <Table.Th ta={"center"}>Title</Table.Th>
                                                        <Table.Th ta={"center"}>Rating</Table.Th>
                                                        <Table.Th ta={"center"}>View Movie</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>{rows}</Table.Tbody>
                                            </Table>
                                            :
                                            <Text>No favourite movies yet</Text>
                                    }
                                </div>
                                <Button onClick={() => {
                                    setJwt('')

                                    navigate('/')
                                }}>Logout</Button>
                            </>
                            :
                            <>
                                <p>Please register or log in to access the Profile Page</p>
                                <Button w={100} onClick={() => navigate('/login')}>Login</Button>
                                <Button w={100} variant="outline" onClick={() => navigate('/register')}>Register</Button>
                            </>
                }
            </Flex>
        </div >
    )
}