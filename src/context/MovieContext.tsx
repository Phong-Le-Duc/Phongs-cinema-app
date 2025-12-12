import { createContext, useContext, useState } from "react";

export type MovieInfo = {
    id?: string;
    title?: string;
    poster_path?: string;
};

const MovieContext = createContext<{
    movie: MovieInfo;
    setMovie: (movie: MovieInfo) => void;
}>({
    movie: {},
    setMovie: () => { },
});

export function MovieProvider({ children }: { children: React.ReactNode }) {
    const [movie, setMovie] = useState<MovieInfo>({});
    return (
        <MovieContext.Provider value={{ movie, setMovie }}>
            {children}
        </MovieContext.Provider>
    );
}

export function useMovie() {
    return useContext(MovieContext);
}