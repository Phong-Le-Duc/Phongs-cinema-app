import { type Movie } from "../Types.ts"


// this loader fetches upcoming movies from TMDB API
export async function UpcomingMoviesLoader(): Promise<{ movies: Movie[] }> {
    const response = await fetch('https://api.themoviedb.org/3/movie/upcoming', {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
    }
    const movieData = await response.json();
    return { movies: movieData.results }; 
}



// this loader fetches top movies from TMDB API
export async function TopMoviesLoader(): Promise<{ movies: Movie[] }> {
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated', {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
    }
    const movieData = await response.json();
    console.log(movieData.results[0]); // See first movie structure
    return { movies: movieData.results };
}



// this loader fetches popular movies from TMDB API
export async function RecommendedMoviesLoader(): Promise<{ movies: Movie[] }> {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }
    const movieData = await response.json();
    // console.log(movieData.results[0]); // See first movie structure
    return { movies: movieData.results };
}


// this loader fetches current movies from TMDB API
export async function CurrentMoviesLoader(): Promise<{ movies: Movie[] }> {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing', {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }
    const movieData = await response.json();
    // console.log(movieData.results[0]); // See first movie structure
    return { movies: movieData.results };
}




// EXPLORE PAGE LOADER,  multiple fetches...
//  This loader fetches  top_rated AND upcoming AND popular. 
// 🟦 TypeScript: Promise<{ topMovies: Movie[], recommendedMovies: Movie[] }>
export async function ExploreLoader(): Promise<{ topMovies: Movie[], upcomingMovies: Movie[], recommendedMovies: Movie[] }> {
    // 🟩 JavaScript: Promise.all fetches both at the same time (faster!)
    const [topRatedResponse, popularResponse, upcomingResponse] = await Promise.all([
        fetch('https://api.themoviedb.org/3/movie/top_rated', {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            }
        }),
        fetch('https://api.themoviedb.org/3/movie/popular', {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            }
        }),
        // 🆕 Add upcoming movies fetch
        fetch('https://api.themoviedb.org/3/movie/upcoming', {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            }
        })
    ]);

    if (!topRatedResponse.ok || !upcomingResponse.ok || !popularResponse.ok) {
        throw new Error("Failed to fetch movies");
    }

    const topRatedData = await topRatedResponse.json();
    const upcomingData = await upcomingResponse.json();
    const popularData = await popularResponse.json();

    // 🟩 JavaScript: Return both arrays in an object
    return {
        topMovies: topRatedData.results,
        upcomingMovies: upcomingData.results,
        recommendedMovies: popularData.results
    };
}