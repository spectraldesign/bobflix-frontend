import { Flex, Pagination, SimpleGrid, Text } from "@mantine/core"
import MoviePoster from "../components/MoviePoster"
import { mockedData } from "../mockData"
import { createContext, useEffect, useState } from "react"
import { MovieType } from "../types/MovieType"
import LoadingComponent from "../components/LoadingComponent"
import SearchBox from "../components/SearchBox"

export const SearchContext = createContext({} as { search: string, setSearch: (search: string) => void });
export default function Home() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([] as MovieType[]);

    // Get initial data
    useEffect(() => {
        setMovies(mockedData); //placeholder, do API request
        setTotalPages(1); //placeholder, do API request
        setPage(1);
        setLoading(false);
        setSearch("");
    }, [])

    useEffect(() => {
        setLoading(true);
        // Fetch data from API
        // setMovies(response.data.Search);
        // placeholder
        setMovies(mockedData.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase())));
        setLoading(false);
    }, [search, page])
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
            ta="center"
        >
            {
                loading ? <LoadingComponent /> : (
                    <>
                        <SearchContext.Provider value={{ search, setSearch }}>
                            <SearchBox />
                        </SearchContext.Provider>
                        {
                            search ?
                                <Text ta="center" w={"100%"}>Search results for "{search}"</Text>
                                :
                                <></>
                        }
                        {
                            movies && movies.length > 0 ?
                                <>
                                    <SimpleGrid
                                        cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}
                                        spacing="md"
                                        verticalSpacing="50px"
                                    >
                                        {
                                            movies.map((movie) => {
                                                return (
                                                    <MoviePoster key={movie.imdbID} {...movie} />
                                                )
                                            })

                                        }
                                    </SimpleGrid>
                                    <Pagination
                                        total={totalPages}
                                        value={page}
                                        onChange={(value) => {
                                            setPage(value)
                                            window.scrollTo(0, 0);
                                        }}
                                        pb={10}
                                        mt={40}
                                    />
                                </>
                                :
                                <Text ta="center" w={"100%"} fs="italic">No movies found</Text>
                        }
                    </>
                )
            }
        </Flex>
    )
}