import { useEffect, useState } from "react";
import { randomNumber } from "../utils/numbers";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const RandomMovieModal = () => {
    const [genres, setGenres] = useState<[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [randomMovie, setRandomMovie] = useState<any>(null);

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let isMounted = true;

        const fetchGenres = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
                    options
                );
                const data = await response.json();

                if (isMounted) {
                    console.log(data);
                    setGenres(data.genres);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchGenres();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGenre(Number(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedGenre) return;
        try {
            console.log("Selected genre: ", selectedGenre);
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            };
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?page=1&with_genres=${selectedGenre}`,
                options
            );
            const data = await response.json();
            const maxPages = Math.min(data.total_pages, 500);
            const randomPage = randomNumber(maxPages) + 1;
            console.log(randomPage);
            const res = await fetch(
                `https://api.themoviedb.org/3/discover/movie?page=${randomPage}&with_genres=${selectedGenre}`,
                options
            );
            const data2 = await res.json();
            if (data2.results && data2.results.length > 0) {
                const randomMovie = randomNumber(data2.results.length);
                setRandomMovie(data2.results[randomMovie]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Random Movie Modal</h2>
            {randomMovie && (
                <div>
                    <h3>{randomMovie.title}</h3>
                    <p>{randomMovie.overview}</p>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
                        alt={randomMovie.title}
                    />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                {genres &&
                    genres.map((genre: any) => (
                        <div key={genre.id}>
                            <input
                                type="radio"
                                key={genre.id}
                                value={genre.id}
                                name="genre"
                                id={genre.name}
                                onChange={handleGenreChange}
                                checked={selectedGenre === genre.id}
                            />
                            <label htmlFor={genre.name}>{genre.name}</label>
                        </div>
                    ))}
                <button>Find</button>
            </form>
        </div>
    );
};

export default RandomMovieModal;
