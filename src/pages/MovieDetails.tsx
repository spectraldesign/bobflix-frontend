import { Divider, Flex, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieType } from "../api/Bobflix";
import BigMoviePoster from "../components/BigMoviePoster";
import RatingComponent from "../components/RatingComponent";
import { mockedData } from "../mockData";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState({} as MovieType);
    const [loading, setLoading] = useState(true);

    // Get movie
    useEffect(() => {
        // Placeholder, fetch data from API
        setMovie(mockedData.find((movie) => movie.ImdbID === id) as MovieType);
        setLoading(false);
    }, [id])

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
                    loading ?
                        <h1>Loading...</h1> : (
                            movie ?
                                <SimpleGrid
                                    cols={{ base: 1, md: 2 }}
                                    spacing="md"
                                    verticalSpacing="50px"
                                    content="center"
                                >
                                    <BigMoviePoster movie={movie} />
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
                                            {movie.plot}
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
        </div>
    )
}