import { useEffect, useState } from "react";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const RandomMovieModal = () => {
    const [genres, setGenres] = useState<[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

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

    return (
        <div>
            <h2>Random Movie Modal</h2>
            <form>
                {genres &&
                    genres.map((genre: any) => (
                        <div>
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
            </form>
        </div>
    );
};

export default RandomMovieModal;
