export type TMovie = {
    id: number;
    backdrop_path: string;
    poster_path: string;
    original_title: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
    original_language: string;
    production_companies: TProductionCompanies[];
    popularity: number;
};

export type TProductionCompanies = {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
};
