# 🎬 LOADER & FETCH GUIDE - FRA START TIL SLUT

*En komplet step-by-step guide baseret på TMDB Movie opgaven*

---

## 📋 OVERSIGT - HVAD SKAL VI LAVE?

Vi skal hente upcoming movies fra TMDB API og vise dem på vores hjemmeside.

**Data flow:** API → Loader → Router → Page → Section → Card

---

## ✅ TRIN 1: DEFINER DATATYPER

**Formål:** TypeScript skal vide hvilken form vores data har.

**Fil:** `src/Types.ts`

```ts
export type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
}
```

**💡 TIP:** Tjek TMDB API dokumentationen eller console.log svaret for at se hvilke felter der findes.

---

## ✅ TRIN 2: OPRET LOADER FUNKTIONEN

**Formål:** Hente data fra API'et, inden siden vises.

**Fil:** `src/loaders/LoaderMovie.tsx`

```ts
import { type Movie } from "../Types"

export async function UpcomingMoviesLoader(): Promise<{ movies: Movie[] }> {
    const response = await fetch('https://api.themoviedb.org/3/movie/upcoming', {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          
        }
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }
    
    const data = await response.json();
    
    // TMDB wrapper dataen i et "results" array
    return { movies: data.results };
}
```

**⚠️ VIGTIGT:**
- Returner ALTID et object: `{ movies: data.results }` ikke bare `data.results`
- TMDB kræver Bearer token i authorization header
- Tjek altid `if (!response.ok)` for fejl

**📌 Environment Variable:**

Opret `.env` fil i rod-mappen:
```
VITE_TMDB_API_KEY=din_api_nøgle_her
```

---

## ✅ TRIN 3: TILFØJ LOADER TIL ROUTER

**Formål:** Forbinde loader med den rigtige route, så data loades når brugeren går til siden.

**Fil:** `src/router.tsx`

```ts
import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/Home";
import { UpcomingMoviesLoader } from "./loaders/LoaderMovie";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: UpcomingMoviesLoader  // ← Tilføj loader her
            },
            // andre routes...
        ]
    }
]);
```

**💡 TIP:** `index: true` betyder det er standard-siden når du går til "/"

---

## ✅ TRIN 4: HENT DATA I PAGE COMPONENT

**Formål:** Modtage den data som loader har hentet og send den videre til sections.

**Fil:** `src/pages/Home.tsx`

```ts
import { useLoaderData } from "react-router";
import { type Movie } from "../Types";
import UpcomingMoviesSection from "../components/sections/UpcomingMoviesSection";

export default function Home() {
    // Hent data fra loader
    const { movies } = useLoaderData() as { movies: Movie[] };
    
    return (
        <main>
            <UpcomingMoviesSection movies={movies} />
        </main>
    );
}
```

**⚠️ VIGTIGT:**
- Brug `as { movies: Movie[] }` for type safety
- Destructure navnet skal matche det du returnerede i loader: `{ movies }`

---

## ✅ TRIN 5: VIS DATA I SECTION COMPONENT

**Formål:** Loope gennem alle movies og vise dem i et grid.

**Fil:** `src/components/sections/UpcomingMoviesSection.tsx`

```ts
import { type Movie } from "../../Types";
import MovieCard from "../cards/MovieCard";

export default function UpcomingMoviesSection({ movies }: { movies: Movie[] }) {
    return (
        <section className="p-4">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <div className="grid grid-cols-2 gap-4">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
}
```

**⚠️ VIGTIGT:**
- Brug ALTID `key={movie.id}` i map
- Send hele movie object videre til Card: `movie={movie}`

---

## ✅ TRIN 6: LAV MOVIE CARD COMPONENT

**Formål:** Vise en enkelt movie med billede, titel og release date.

**Fil:** `src/components/cards/MovieCard.tsx`

```ts
import { type Movie } from "../../Types";

export default function MovieCard({ movie }: { movie: Movie }) {
    // TMDB image base URL + størrelse + poster_path
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    
    return (
        <div className="rounded-lg overflow-hidden shadow-lg">
            {movie.poster_path && (
                <img 
                    src={posterUrl} 
                    alt={movie.title}
                    className="w-full h-auto"
                />
            )}
            <div className="p-4">
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <p className="text-sm text-gray-600">{movie.release_date}</p>
            </div>
        </div>
    );
}
```

**💡 TIP:**
- TMDB billeder kræver fuld URL: `https://image.tmdb.org/t/p/w500` + `poster_path`
- Billedstørrelser: w200, w300, w500, original
- Tjek om `poster_path` eksisterer før du viser billedet

---

## 🎯 FOLDER STRUKTUR

```
src/
├── Types.ts                           ← TRIN 1: Type definitions
├── loaders/
│   └── LoaderMovie.tsx               ← TRIN 2: Fetch data
├── router.tsx                        ← TRIN 3: Connect loader
├── pages/
│   └── Home.tsx                      ← TRIN 4: Use data
├── components/
    ├── sections/
    │   └── UpcomingMoviesSection.tsx ← TRIN 5: Map data
    └── cards/
        └── MovieCard.tsx             ← TRIN 6: Display item
```

---

## 🔄 DATA FLOW DIAGRAM

```
1. Browser går til "/"
   ↓
2. Router ser loader: UpcomingMoviesLoader
   ↓
3. Loader fetcher fra TMDB API
   ↓
4. Loader returner { movies: [...] }
   ↓
5. Home.tsx modtager via useLoaderData()
   ↓
6. Home sender movies til UpcomingMoviesSection
   ↓
7. Section mapper gennem movies
   ↓
8. Hver movie vises i MovieCard
```

---

## 📝 HURTIG TJEKLISTE

Når du skal lave en ny loader/fetch:

- [ ] **TRIN 1:** Definer type i `Types.ts`
- [ ] **TRIN 2:** Opret loader fil i `loaders/`
- [ ] **TRIN 3:** Import og tilføj loader i `router.tsx`
- [ ] **TRIN 4:** Brug `useLoaderData()` i page component
- [ ] **TRIN 5:** Send data til section component
- [ ] **TRIN 6:** Map gennem data i section
- [ ] **TRIN 7:** Vis hver item i card component

---

## ⚠️ ALMINDELIGE FEJL

### ❌ Glemmer at wrappe i object
```ts
// FORKERT
return data.results;

// RIGTIGT
return { movies: data.results };
```

### ❌ Glemmer key prop i map
```ts
// FORKERT
{movies.map(movie => <MovieCard movie={movie} />)}

// RIGTIGT
{movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
```

### ❌ Forkert type casting
```ts
// FORKERT
const movies = useLoaderData() as Movie[];

// RIGTIGT (matcher loader return)
const { movies } = useLoaderData() as { movies: Movie[] };
```

### ❌ Glemmer TMDB image base URL
```ts
// FORKERT
<img src={movie.poster_path} />

// RIGTIGT
<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
```

---

## 🎉 DONE!

Nu har du en fungerende loader der henter movies fra TMDB og viser dem på siden!

**Next steps:**
- Style MovieCard med bedre design
- Tilføj hover effekter
- Lav flere loaders til andre endpoints (now_playing, popular, etc.)
- Tilføj loading states og error handling






## LOADER/FETCH PROCESS ANALOGY:

---

### 🏭 **1. LOADER (Factory/Warehouse) - LoaderDetails.tsx**

```tsx
// 📍 Location: src/loaders/LoaderDetails.tsx

export async function LoaderDetails({ params }: LoaderFunctionArgs) {
    // 🏭 Factory worker fetches raw materials from TMDB API
    const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}`);
    
    // 📦 Unpacks the delivery from API
    const apiResponseData = await response.json();
    
    // 🏷️ Puts it in a box and labels it "movieDetail"
    return { movieDetail: apiResponseData };
    //       ^^^^^^^^^^^
    //       Label on the box
}
```

**Package contents:**
```js
📦 Box labeled "movieDetail"
   Inside: {
     id: 550,
     title: "Fight Club",
     overview: "...",
     backdrop_path: "...",
     vote_average: 8.4,
     ...
   }
```

---

### 🚚 **2. ROUTER (Delivery Service) - router.tsx**

```tsx
// 📍 Location: src/router.tsx

{
    path: '/movie/:id',           // 🗺️ Delivery address
    element: <Details />,         // 🏠 Destination house
    loader: LoaderDetails         // 🚚 Delivery truck
}
```

**What happens:**
```
1. User clicks link: /movie/550
2. Router says: "Oh! I need to deliver to /movie/:id"
3. Router calls LoaderDetails truck: "Go fetch the package!"
4. LoaderDetails returns: 📦 { movieDetail: data }
5. Router delivers to Details page
```

---

### 🏠 **3. PAGE (Your House) - Details.tsx**

```tsx
// 📍 Location: src/pages/Details.tsx

export default function Details() {
    // 📬 Mailbox - receive the package from router
    const { movieDetail } = useLoaderData() as { movieDetail: Movie };
    //      ^^^^^^^^^^^
    //      Opens box labeled "movieDetail"
    
    // 🎁 Pass the contents to the living room (Section)
    return (
        <>
            {/*🎁 You wrap it as a gift with a NEW name */}
            {/* 🎨 NAME CHANGE! movieDetail → movieDetailData (prop name YOU choose) */}
            <MovieDetailSection movieDetailData={movieDetail} />
            {/*                  ^^^^^^^^^^^^^^^ ^^^^^^^^^^^  */}
            {/*                  NEW prop name   Original var */}
        </>
    );
}
```

**What happens:**
```
1. 📬 useLoaderData() checks mailbox
2. 📦 Finds package: { movieDetail: {...} }
3. 🔓 Opens it: const { movieDetail } = ...
4. ✅ Now has the movie data
5. 🎁 Passes it to MovieDetailSection as a gift
```

---

### 🛋️ **4. SECTION (Living Room) - MovieDetailSection.tsx**

```tsx
// 📍 Location: src/components/sections/MovieDetailSection.tsx

export default function MovieDetailSection({ movieDetailData }: { movieDetailData: Movie }) {
    //                                        ^^^^^^^^^^^^^^
    //                                        Receives the gift with a new name
    
    return (
        <div>
            {/* 🖼️ Hangs the picture on the wall */}
            <img src={movieDetailData.backdrop_path} />
            
            {/* 📰 Displays the information */}
            <h1>{movieDetailData.title}</h1>
            <p>{movieDetailData.overview}</p>
        </div>
    );
}
```

---

## 🔗 **COMPLETE TRACE:**

```
📍 LoaderDetails.tsx (Factory)
   ↓
   Creates: { movieDetail: apiResponseData }
   ↓
📍 router.tsx (Delivery Service)
   ↓
   Delivers package to Details page
   ↓
📍 Details.tsx (Your House)
   ↓
   Receives: const { movieDetail } = useLoaderData()
   ↓
   Unwraps and passes: movieDetailData={movieDetail}
   ↓
📍 MovieDetailSection.tsx (Living Room)
   ↓
   Uses: movieDetailData.title, movieDetailData.overview, etc.
   ↓
📺 Display on screen!
```

---

## 🏷️ **Name Changes Along the Way:**

| Location | Variable Name | What It Is |
|----------|---------------|------------|
| **LoaderDetails** | `apiResponseData` | Raw data from API |
| **LoaderDetails return** | `movieDetail` | Property name in box 📦 |
| **Details page** | `movieDetail` | Extracted from box |
| **Details props** | `movieDetailData` | Renamed when passing to section |
| **MovieDetailSection** | `movieDetailData` | Parameter name in section |

---

## 💡 **Key Connections:**

```tsx
// 🏭 FACTORY (Loader) - Creates the label
return { movieDetail: apiResponseData };
         ^^^^^^^^^^^

// 🏠 HOUSE (Page) - Reads the label to open box
const { movieDetail } = useLoaderData();
        ^^^^^^^^^^^
        ↓
        THESE MUST MATCH! ✅

// 🎁 GIFT (Prop) - Can be renamed when passing
<MovieDetailSection movieDetailData={movieDetail} />
                    ^^^^^^^^^^^^^^^ ^^^^^^^^^^^
                    New name        Old name
```

---

## 🎯 **In One Sentence:**

**LoaderDetails** puts data in a box labeled **"movieDetail"** → **Router** delivers it → **Details page** opens the box by looking for label **"movieDetail"** → passes contents as **"movieDetailData"** → **MovieDetailSection** displays it! 🚀