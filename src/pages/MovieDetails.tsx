import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { MovieType } from "../types/MovieType";
import { mockedData } from "../mockData";
import { Center, Divider, Flex, Image, SimpleGrid, Text } from "@mantine/core";
import RatingComponent from "../components/RatingComponent";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState({} as MovieType);
    const [loading, setLoading] = useState(true);

    // Get movie
    useEffect(() => {
        // Placeholder, fetch data from API
        setMovie(mockedData.find((movie) => movie.imdbID === id) as MovieType);
        setLoading(false);
    }, [])

    return (
        <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
            h="100%"
            style={{ gridArea: "main", zIndex: 0 }}
            ta="center"
        >
            {
                loading ?
                    <h1>Loading...</h1> : (
                        movie ?
                            <SimpleGrid
                                cols={{ base: 1, md: 2 }}
                                spacing="md"
                                verticalSpacing="50px"
                                content="center"
                            >
                                <Center>
                                    <Image src={movie.posterUrl} alt={movie.title} w={"auto"} h={{ base: 450, md: 600, lg: 700 }} />
                                    <Image pos={"absolute"} style={{ filter: 'blur(30px)', zIndex: -1, opacity: 0.3 }} src={movie.posterUrl} alt={movie.title} w={"auto"} h={{ base: 450, md: 600, lg: 700 }} />
                                </Center>
                                <Flex justify={"center"} align={"center"} direction={"column"}>
                                    <Text fs={"oblique"} fw={700} mb={10}>{movie.title}</Text>
                                    <Divider
                                        w={{ base: 350, sm: 650, md: 450, lg: 550, xl: 700 }}
                                        my={"md"} label="MOVIE DESCRIPTION"
                                        labelPosition={"center"}
                                        c="white"
                                        size={"xs"}
                                    />
                                    <Text w={{ base: 350, sm: 650, md: 450, lg: 550, xl: 700 }}>
                                        {movie.description}
                                    </Text>
                                    <Divider
                                        w={{ base: 350, sm: 650, md: 450, lg: 550, xl: 700 }}
                                        my={"md"} label="RATE MOVIE"
                                        labelPosition={"center"}
                                        c="white"
                                        size={"xs"}
                                    />
                                    <RatingComponent movie={movie} />
                                </Flex>

                            </SimpleGrid>
                            :
                            <h1>Movie not found</h1>
                    )
            }
        </Flex>
    )
}