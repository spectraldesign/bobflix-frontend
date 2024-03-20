import { ActionIcon, Tooltip } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../App";
import { BobflixAPI, MovieType } from "../api/Bobflix";
export default function FavouriteButton({ movie, size, className }: { movie: MovieType, size: string, className?: string }) {
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [isFavourite, setIsFavourite] = useState(user?.favouriteMovies?.includes(movie) || false)
    const favouriteMovie = () => {
        if (!user) {
            return toast.error("Please log in to favourite movies!");
        }
        setLoading(true);
        BobflixAPI.toggleFavourite(movie.imdbId).then((res) => {
            if (!res.success) {
                toast.error(res.errorMessage);
            }
            else {
                setIsFavourite(res.data.favourite);
                res.data.favourite ? toast.success("Added to favourites!") : toast.success("Removed from favourites!");
            }
            setLoading(false);
        })
    }
    return (
        <Tooltip label={isFavourite ? "Remove from favourites" : "Add to favourites"} position="left" withArrow>
            <ActionIcon
                className={className}
                loading={loading}
                onClick={() => favouriteMovie()}
                variant={isFavourite ? "gradient" : "transparent"}
                color={isFavourite ? "white" : "gold"}
                gradient={{ from: 'orange', to: 'gold', deg: 154 }}
                size={size}
                style={{ filter: isFavourite ? "drop-shadow(0 0 5px rgba(255,215,0, 0.3))" : "drop-shadow(0 0 1px rgba(0,0,0, 1))" }}
            >
                <IconHeart />
            </ActionIcon>
        </Tooltip>
    )
}