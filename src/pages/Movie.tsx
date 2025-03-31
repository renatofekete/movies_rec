import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TMovie } from "../types/Movie";
import Rating from "../components/Rating";
import { fixedNumber } from "../utils/numbers";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

function Movie() {
    const [movie, setMovie] = useState<TMovie | null>(null);
    const [userRating, setUserRating] = useState<number>(0);
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

        const fetchUserRating = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/account_states`,
                    options
                );
                const data = await response.json();

                if (isMounted && data.rated) {
                    setUserRating(data.rated.value);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovie();
        fetchUserRating();

        return () => {
            isMounted = false;
        };
    }, [movieId]);

    async function handleRating(value: number) {
        console.log("RATING:", value);
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
                value,
            }),
        };
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/rating`,
            options
        );

        console.log(response);
    }
    return (
        <div>
            <h1>Movie: {movie?.original_title}</h1>
            <div>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt=""
                />
                <p>{movie?.overview}</p>
            </div>
            <Rating
                myRating={userRating}
                max={10}
                handleRating={handleRating}
            />
            <h2>
                Rating:{" "}
                {movie?.vote_average && fixedNumber(movie?.vote_average, 1)}
            </h2>
            <h2>Language: {movie?.original_language}</h2>
            <h2>
                Production companies:{" "}
                {movie?.production_companies
                    .map((company) => company.name)
                    .join(", ")}
            </h2>
        </div>
    );
}

export default Movie;
