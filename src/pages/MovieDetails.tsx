import { Divider, Flex, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BobflixAPI, MovieType } from "../api/Bobflix";
import BigMoviePoster from "../components/BigMoviePoster";
import ErrorComponent from "../components/ErrorComponent";
import FavouriteButton from "../components/FavouriteButton";
import LoadingComponent from "../components/LoadingComponent";
import RatingComponent from "../components/RatingComponent";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState({} as MovieType);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Get movie
    useEffect(() => {
        setLoading(true);
        if (!id) {
            return;
        }
        BobflixAPI.getMovieById(id).then((res) => {
            if (!res.success) {
                toast.error(res.errorMessage);
                setError(`Failed to load data: ${res.errorMessage}`);
            }
            else {
                setMovie(res.data);
            }
            setLoading(false);
        })
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
                    loading ? <LoadingComponent /> :
                        error.length > 0 ? <ErrorComponent error={error} /> :
                            (
                                movie ?
                                    <SimpleGrid
                                        cols={{ base: 1, md: 2 }}
                                        spacing="md"
                                        verticalSpacing="50px"
                                        content="center"
                                    >
                                        <BigMoviePoster movie={movie} />
                                        <Flex justify={"center"} align={"center"} direction={"column"}>
                                            <FavouriteButton movie={movie} size="xl" className="bigMoviePosterFavourite" />
                                            <Text fs={"oblique"} fw={700} mb={10}>{movie.title}</Text>
                                            {
                                                movie.director.length > 3 ?
                                                    <>
                                                        <Divider
                                                            w={{ base: 350, sm: 650, md: 450, lg: 550, xl: 700 }}
                                                            my={"md"} label="DIRECTOR"
                                                            labelPosition={"center"}
                                                            c="white"
                                                            size={"xs"}
                                                        />
                                                        <Text w={{ base: 350, sm: 650, md: 450, lg: 550, xl: 700 }}>
                                                            {movie.director}
                                                        </Text>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            <Divider
                                                w={{ base: 350, sm: 650, md: 450, lg: 550, xl: 700 }}
                                                my={"md"} label="MOVIE PLOT"
                                                labelPosition={"center"}
                                                c="white"
                                                size={"xs"}
                                            />
                                            <Text w={{ base: 350, sm: 650, md: 450, lg: 550, xl: 700 }}>
                                                {movie.plot}
                                            </Text>

                                            {
                                                movie.released.length > 3 ?
                                                    <>
                                                        <Divider
                                                            w={{ base: 350, sm: 650, md: 450, lg: 550, xl: 700 }}
                                                            my={"md"} label="RELEASED"
                                                            labelPosition={"center"}
                                                            c="white"
                                                            size={"xs"}
                                                        />
                                                        <Text w={{ base: 350, sm: 650, md: 450, lg: 550, xl: 700 }}>
                                                            {movie.released}
                                                        </Text>
                                                    </>
                                                    :
                                                    <></>
                                            }
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