import { useEffect, useState } from "react";
import { TMovie } from "../types/Movie";
import { getYear } from "../utils/date";
import { fixedNumber } from "../utils/numbers";
import { Link } from "react-router";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

function App() {
    const [movies, setMovies] = useState<TMovie[]>([]);
    const [page, setPage] = useState(1);
    console.log(import.meta.env.VITE_ACCESS_TOKEN);
    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let isMounted = true;

        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
                    options
                );
                const data = await response.json();

                if (isMounted) {
                    setMovies((prevMovies) => [...prevMovies, ...data.results]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();

        return () => {
            isMounted = false;
        };
    }, [page]);

    return (
        <>
            Movies
            <div>
                {movies.map((movie, id) => (
                    <article key={movie.id}>
                        <p>{fixedNumber(movie.vote_average, 1)}</p>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                            alt={movie.title}
                        />
                        <h2 key={id}>
                            <Link
                                to={`movie/${movie.id}`}
                                state={{ id: movie.id }}
                            >
                                {movie.title}
                            </Link>{" "}
                            ({getYear(movie.release_date)})
                        </h2>
                        <p>Language: {movie.original_language}</p>
                    </article>
                ))}
            </div>
            <button onClick={() => setPage((prevPage) => prevPage + 1)}>
                Load more
            </button>
        </>
    );
}

export default App;
