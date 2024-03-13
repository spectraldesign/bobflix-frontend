import { Autocomplete, Flex, SimpleGrid } from "@mantine/core"
import MoviePoster from "../components/MoviePoster"
import { mockedData } from "../mockData"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate();
    return (
        <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
            h="100%"
            style={{ gridArea: "main" }}
        >
            <Autocomplete
                pos="relative"
                top={-20}
                w={{ base: 150, xs: 200, sm: 250, md: 350 }}
                label="Search"
                placeholder="Select a movie"
                data={mockedData.map((movie) => movie.title)}
                onOptionSubmit={(value) => {
                    const movie = mockedData.find((movie) => movie.title === value);
                    if (movie) {
                        navigate(`/movie/${movie.imdbID}`, { replace: true });
                    }
                }}
                limit={3}
            />
            <SimpleGrid
                cols={{ base: 2, xs: 3, sm: 4, md: 5 }}
                spacing="md"
                verticalSpacing="50px"
            >
                {
                    mockedData ?
                        mockedData.map((movie) => {
                            return (
                                <MoviePoster key={movie.imdbID} {...movie} />
                            )
                        })
                        :
                        <p>No movies to display</p>
                }

            </SimpleGrid>
        </Flex>
    )
}