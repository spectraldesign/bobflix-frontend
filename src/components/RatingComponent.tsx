import { Center, Flex, Text } from "@mantine/core";
import { MovieType } from "../types/MovieType";

export default function RatingComponent({ movie }: { movie: MovieType }) {

    return (
        <Flex
            direction={"row"}
            mt={-70}
        >
            {
                // Create 10 stars. movie.currentUserRating of which should be filled, the rest should be empty
                Array.from({ length: 10 }, (_, index) => (
                    <>
                        <p
                            style={{
                                display: index < movie.currentUserRating ? "block" : "none",
                                fontSize: 50,
                                fontWeight: 700,
                                color: "gold",
                                filter: "drop-shadow(0 0 5px rgba(255,215,0, 0.3))",
                                cursor: "pointer",
                            }}
                        >
                            ★
                        </p>
                        <p
                            style={{
                                display: index < movie.currentUserRating ? "none" : "block",
                                fontSize: 50,
                                fontWeight: 700,
                                cursor: "pointer",
                                color: "white",
                            }}
                        >
                            ☆
                        </p>
                    </>
                ))
            }
        </Flex>
    )
}