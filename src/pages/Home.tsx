import { Flex, Pagination, SimpleGrid, Text } from "@mantine/core";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BobflixAPI, MovieType } from "../api/Bobflix";
import ErrorComponent from "../components/ErrorComponent";
import LoadingComponent from "../components/LoadingComponent";
import MoviePoster from "../components/MoviePoster";
import SearchBox from "../components/SearchBox";

export const SearchContext = createContext({} as { search: string, setSearch: (search: string) => void });
export default function Home() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [movies, setMovies] = useState([] as MovieType[]);

    useEffect(() => {
        if (search && search.length > 0) {
            BobflixAPI.searchMovies(search, page).then((res) => {
                if (!res.success) {
                    toast.error(res.errorMessage);
                    setError(`Failed to load data: ${res.errorMessage}`);
                    setLoading(false);
                    return;
                }
                else {
                    setMovies(res.data!.movies);
                    setTotalPages(res.data!.totalPages);
                }
                setLoading(false);
            })
        }
        else {
            BobflixAPI.getMovies(page).then((res) => {
                if (!res.success) {
                    toast.error(res.errorMessage);
                    setError(`Failed to load data: ${res.errorMessage}`);
                    setLoading(false);
                    return;
                }
                else {
                    console.log(res.data)
                    setMovies(res.data);
                    setTotalPages(res.data!.totalPages);
                }
                setLoading(false);
            })
        }
    }, [search, page])

    return (
        <div className="main">
            <Flex
                gap="md"
                justify="center"
                align="center"
                direction="column"
                ta="center"
            >
                {
                    error.length > 0 ? <ErrorComponent error={error} />
                        : (
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
                        )
                }
            </Flex>
        </div>
    )
}