import { Flex, Text } from "@mantine/core";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BobflixAPI, MovieType } from "../api/Bobflix";
import { UserContext } from "../App";

export default function RatingComponent({ movie }: { movie: MovieType }) {
    const { user } = useContext(UserContext)
    const [rating, setRating] = useState<number>(movie.currentUserRating);
    const [hoverRating, setHoverRating] = useState<number>(movie.currentUserRating);

    const handleStarHover = (starIndex: number) => {
        setHoverRating(starIndex + 1);
    };

    const handleStarLeave = () => {
        setHoverRating(rating);
    };

    const handleStarClick = (starIndex: number) => {
        if (!user) {
            return toast.error("Please log in to rate movies!");
        }
        BobflixAPI.rateMovie(movie.imdbId, starIndex + 1).then((res) => {
            if (!res.success) {
                toast.error(res.errorMessage);
            }
            else {
                setRating(starIndex + 1);
                toast.success("Rating saved!");
            }
        })
    };
    return (
        <Flex direction={"column"}>
            <Flex
                direction={"row"}
                mt={-70}
                mb={-50}
            >
                {[...Array(10)].map((_, index) => (
                    <div key={index}>
                        <p
                            onMouseEnter={() => handleStarHover(index)}
                            onMouseLeave={() => handleStarLeave()}
                            onClick={() => handleStarClick(index)}
                            style={{
                                fontSize: 50,
                                fontWeight: 700,
                                cursor: "pointer",
                                color: index < hoverRating ? "gold" : "white",
                                filter:
                                    index < hoverRating
                                        ? "drop-shadow(0 0 5px rgba(255,215,0, 0.3))"
                                        : "drop-shadow(0 0 1px rgba(0,0,0, 1))",
                                display: index < rating ? "block" : "none",
                            }}
                        >
                            ★
                        </p>
                        <p
                            onMouseEnter={() => handleStarHover(index)}
                            onMouseLeave={() => handleStarLeave()}
                            onClick={() => handleStarClick(index)}
                            style={{
                                fontSize: 50,
                                fontWeight: 700,
                                cursor: "pointer",
                                color: index >= hoverRating ? "lightgrey" : "gold",
                                display: index >= rating ? "block" : "none",
                                filter: "drop-shadow(0 0 1px rgba(0,0,0, 1))"
                            }}
                        >
                            ☆
                        </p>
                    </div>
                ))}
            </Flex>
            <Text ta={"center"} fw={"bold"} size="lg" c={hoverRating != rating ? "lightgrey" : "gold"}>{hoverRating}/10</Text>
            <Text mt={10} ta={"center"} size="sm">Avarage rating: {movie.avgRating} | Source: IMDB</Text>
        </Flex>
    )
}