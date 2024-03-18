import { Image, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MovieType } from "../api/Bobflix";
import "./styles/MoviePoster.css";
export default function MoviePoster(poster: MovieType) {
    const navigate = useNavigate();
    return (
        <div className="movie-poster-container" id={poster.imdbID}>
            <Image
                className="movie-poster"
                src={poster.poster_url}
                alt={poster.title}
                h="100%"
                w="100%"
                onClick={() => { navigate(`/movie/${poster.imdbID}`) }}
            />

            <Image
                className="movie-poster-glow"
                pos="relative"
                top={-400}
                h="100%"
                w="100%"
                radius="20px"
                src={poster.poster_url}
                alt={poster.title}
            />
            <Text pos="relative" top={-400} mt={10} size="md" w={250} ta="center" truncate="end">
                {poster.title}
            </Text>
        </div>
    )
}