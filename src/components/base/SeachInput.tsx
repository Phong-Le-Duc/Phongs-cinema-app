

export default function SearchInput() {
    return (
        <div className="relative w-full">
            <img
                src="/src/assets/search-icon.png"
                alt="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 "
            />
            <input
                type="search"
                name="search"
                placeholder="Search your favorite movie"
                className="px-5 py-2 pl-10 bg-primary_2 text-primary_3 rounded-md w-full"
            />
        </div>
    );
}
