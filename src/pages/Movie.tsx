import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TMovie } from "../types/Movie";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

function Movie() {
    const [movie, setMovie] = useState<TMovie | null>(null);
    const { movieId } = useParams();

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let isMounted = true;

        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    options
                );
                const data = await response.json();

                if (isMounted) {
                    console.log(data);
                    setMovie(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovie();

        return () => {
            isMounted = false;
        };
    }, [movieId]);
    return (
        <div>
            <h1>Movie: {movie?.original_title}</h1>
        </div>
    );
}

export default Movie;
