import { Image, Text } from "@mantine/core";
import { MovieType } from "../types/MovieType";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MoviePoster(poster: MovieType) {
    const navigate = useNavigate();
    const [opacity, setOpacity] = useState(0.2);

    const handleMouseOver = (e: any) => {
        e.preventDefault();
        e.currentTarget.style.filter = 'brightness(1)';
        e.currentTarget.style.scale = '1.02'
        setOpacity(0.4);
    }
    const handleMouseOut = (e: any) => {
        e.preventDefault();
        e.currentTarget.style.filter = 'brightness(0.9)';
        e.currentTarget.style.scale = '1'
        setOpacity(0.2);
    }

    return (
        <div id={poster.imdbID} style={{ height: 300, width: 200, zIndex: 0 }}>
            <Image
                src={poster.posterUrl}
                alt={poster.title}
                radius={10}
                h="100%"
                w="100%"
                style={{
                    filter: 'brightness(0.8)',
                    transition: 'all 0.5s ease',
                    zIndex: 0,
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => handleMouseOver(e)}
                onMouseOut={(e) => handleMouseOut(e)}
                onClick={() => { navigate(`/movie/${poster.imdbID}`) }}
            />

            <Image
                pos="relative"
                top={-300}
                style={{
                    opacity: opacity,
                    zIndex: -1,
                    filter: 'blur(30px)',
                    transition: 'opacity 0.4s ease'
                }}
                h="100%"
                w="100%"
                radius="20px"
                src={poster.posterUrl}
                alt={poster.title}
            />
            <Text pos="relative" top={-300} size="md" w={200} ta="center" truncate="end">
                {poster.title}
            </Text>
        </div>
    )
}