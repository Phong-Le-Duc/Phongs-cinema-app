import { type Movie } from "../../Types"
import BtnBookTicket from "../common/BtnBookTicket";

// 🟦 TypeScript: Define props - receives single movie and images
export default function MovieDetailSection({ movieDetailData, movieImages }: { movieDetailData: Movie; movieImages: any }) {


    // Convert runtime from minutes to hours and minutes

    const hours = Math.floor((movieDetailData.runtime ?? 0) / 60);
    const minutes = (movieDetailData.runtime ?? 0) % 60;


    return (
        <section>
            <div className="right-edge-sticky">
                {/* Movie images gallery - poster first, then scenes */}
                <div className="flex gap-4 overflow-x-scroll mb-4">
                    {/* First image: Main poster (vertical) */}
                    {movieDetailData.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movieDetailData.poster_path}`}
                            alt={`${movieDetailData.title} poster`}
                            className="w-64 h-96 object-cover rounded-lg flex-shrink-0"
                        />
                    )}

                    {/* Following images: Scenes (wider to show more) */}
                    {movieImages?.backdrops && movieImages.backdrops.slice(0, 9).map((backdrop: any, index: number) => (
                        <img
                            key={index}
                            src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                            alt={`${movieDetailData.title} scene ${index + 1}`}
                            className="w-auto h-96 object-cover rounded-lg flex-shrink-0"
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col mb-12">
                {/* Movie title */}
                <h1 className="text-white text-3xl font-bold mb-2">{movieDetailData.title}</h1>

                {/* Director and rating */}
                <div className="flex items-center gap-4 mb-4">
                    {/* <p className="text-gray-400">{movieDetailData.director}</p> */}
                    <p className="text-gray-400">{movieDetailData.release_date}</p>
                    <p className="text-yellow-400">⭐ {movieDetailData.vote_average.toFixed(1)}/10</p>

                </div>

                {/* Genre and playtime */}
                <div className="flex items-center gap-2">

                    {movieDetailData.genres?.slice(0, 2).map(genre => (
                        <p key={genre.id} className="text-gray-400 bg-primary_5 p-1 px-2 rounded">{genre.name}</p>
                    ))}
                    <p className="text-gray-400  bg-primary_5 p-1 px-2 rounded">{hours}h {minutes}min</p>

                </div>
            </div>



            {/* Overview */}
            <div className="flex flex-col gap-4 ">
                <h2 className="text-white text-xl font-bold ">Synopsis</h2>
                <p className="text-gray-300 leading-relaxed ">{movieDetailData.overview}</p>

                <BtnBookTicket movieId={movieDetailData.id} />
            </div>


        </section>
    )
}