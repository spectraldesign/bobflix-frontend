import { Image, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MovieType } from "../api/Bobflix";
import placeholder from "../assets/placeholder_poster.png";
import FavouriteButton from "./FavouriteButton";
import "./styles/MoviePoster.css";
export default function MoviePoster(poster: MovieType) {
    const navigate = useNavigate();
    return (
        <div className="movie-poster-container" id={poster.imdbId}>
            <FavouriteButton movie={poster} size="xl" className="posterFavourite" />
            <Image
                className="movie-poster"
                src={poster.posterUrl}
                alt={poster.title}
                h="100%"
                w="100%"
                onClick={() => { navigate(`/movie/${poster.imdbId}`) }}
                fallbackSrc={placeholder}
            />

            <Image
                className="movie-poster-glow"
                pos="relative"
                top={-400}
                h="100%"
                w="100%"
                radius="20px"
                src={poster.posterUrl}
                alt={poster.title}
                fallbackSrc={placeholder}
            />
            <Text pos="relative" top={-400} mt={10} size="md" w={250} ta="center" truncate="end">
                {poster.title}
            </Text>
        </div>
    )
}