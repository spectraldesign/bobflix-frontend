import { useParams } from "react-router-dom"

export default function MovieDetails() {
    const { id } = useParams();
    console.log(id);
    return (
        <div style={{ gridArea: "main" }}>
            <h1>Movie Details</h1>
        </div>
    )
}