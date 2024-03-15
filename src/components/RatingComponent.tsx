import { Flex, Text } from "@mantine/core";
import { MovieType } from "../types/MovieType";
import { useState } from "react";

export default function RatingComponent({ movie }: { movie: MovieType }) {
    const [rating, setRating] = useState<number>(movie.currentUserRating);
    const [hoverRating, setHoverRating] = useState<number>(movie.currentUserRating);

    const handleStarHover = (starIndex: number) => {
        setHoverRating(starIndex + 1);
    };

    const handleStarLeave = () => {
        setHoverRating(rating);
    };

    const handleStarClick = (starIndex: number) => {
        // Simulate API request, replace with actual API call
        setRating(starIndex + 1);
    };
    return (
        <Flex direction={"column"}>
            <Flex
                direction={"row"}
                mt={-70}
                mb={-50}
            >
                {[...Array(10)].map((_, index) => (
                    <>
                        <p
                            key={index}
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
                                        : "none",
                                display: index < rating ? "block" : "none",
                            }}
                        >
                            ★
                        </p>
                        <p
                            key={index}
                            onMouseEnter={() => handleStarHover(index)}
                            onMouseLeave={() => handleStarLeave()}
                            onClick={() => handleStarClick(index)}
                            style={{
                                fontSize: 50,
                                fontWeight: 700,
                                cursor: "pointer",
                                color: index >= hoverRating ? "white" : "gold",
                                display: index >= rating ? "block" : "none",
                            }}
                        >
                            ☆
                        </p>
                    </>
                ))}
            </Flex>
            <Text ta={"center"} fw={"bold"} size="lg" c={hoverRating != rating ? "white" : "gold"}>{hoverRating}/10</Text>
        </Flex>
    )
}