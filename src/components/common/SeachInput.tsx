import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Movie } from "../../Types";

export default function SearchInput() {
    const { movies } = useLoaderData() as { movies: Movie[] };
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInput(value);

        if (value.length >= 2 && movies.length > 0) {
            setSuggestions(
                movies
                    .map(movie => movie.title)
                    .filter(title =>
                        title.toLowerCase().includes(value.toLowerCase())
                    )
            );
        } else {
            setSuggestions([]);
        }
    }

    function handleSelectSuggestion(title: string) {
        setInput(title);
        setSuggestions([]);
        const movie = movies.find(m => m.title === title);
        if (movie) {
            navigate(`/movie/${movie.id}`);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const movie = movies.find(m => m.title.toLowerCase() === input.toLowerCase());
        if (movie) {
            navigate(`/movie/${movie.id}`);
        } else {
            // Optionally show "not found" or keep current behavior
            navigate(`/movies?search=${encodeURIComponent(input)}`);
        }
    }

    return (
        <div className="relative w-full">
            <form onSubmit={handleSubmit}>
                <img
                    src="/src/assets/search-icon.png"
                    alt="Search"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                />
                <input
                    type="search"
                    name="search"
                    value={input}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Search your favorite movie"
                    className="px-5 py-2 pl-10 bg-primary_2 text-primary_3 rounded-md w-full"
                />
                {suggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-white border mt-1 rounded shadow z-10">
                        {suggestions.map((title, idx) => (
                            <li
                                key={idx}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onMouseDown={() => handleSelectSuggestion(title)}
                            >
                                {title}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
}