import { Center, Image } from "@mantine/core";
import { MovieType } from "../api/Bobflix";
import './styles/BigMoviePoster.css';
export default function BigMoviePoster({ movie }: { movie: MovieType }) {
    const handle3d = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const container = e.currentTarget;
        const { left, top, width, height } = container.getBoundingClientRect();
        const { clientX, clientY } = e;
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = clientX - centerX;
        const deltaY = centerY - clientY;
        const rotationX = deltaY / height * 20;
        const rotationY = deltaX / width * 20;
        container.style.transform = `perspective(1000px) rotateX(${-rotationX}deg) rotateY(${-rotationY}deg)`;
    }
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const container = e.currentTarget;
        container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }
    return (
        <Center className="posterContainer" pos={"relative"} w={"auto"} h={{ base: 450, md: 600, lg: 700 }} onMouseMove={(e) => handle3d(e)} onMouseLeave={(e) => handleMouseLeave(e)}>
            <Image className="poster" src={movie.posterUrl} alt={movie.title} />
            <Image className="posterBlur" src={movie.posterUrl} alt={movie.title} />
        </Center>
    )
}