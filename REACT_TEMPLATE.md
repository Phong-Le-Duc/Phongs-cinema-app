# Steps to create a React template

## Node package manager
**Initialiser node package management:**
Initialiserer et nyt projekt.
projekt
Opretter en ny package.json-fil til dit projekt, som holder styr på afhængigheder, scripts og metadata. Kort sagt: gør projektet klar til at bruge npm.
> npm init

**Vælg MIT under initialiseringen** 
>(license MIT) 

## Lav et Git repository:
Git er et versions controlsystem.
>git init

## installer Vite
frontend-værktøj, der giver en lynhurtig udviklingsserver og optimerede produktionsbuilds. Designet til at være hurtigere og enklere end ældre værktøjer som Webpack og virker med frameworks som React, Vue og Svelte.

>npm create vite@latest (.)

Punktummet (.) skal du bruge hvis du skal blive i mappen hvis en allerede er oprettet.

## Installer projektets afhængigheder eller nye pakker

**Installer alle afhængigheder fra package.json**
>npm i 

**React Router:**
>npm i react-router

**Skab ny fil router.tsx under mappen src**
 >src/router.tsx

## Tailwind CSS:
**Installer Tailwind:**
>npm i tailwindcss @tailwindcss/vite

**import Tailwind i src/index.css:**
>@import "tailwindcss";

 **Importer tailwind i vite.config**
 (import tailwindcss from '@tailwindcss/vite')

så **vite.config** ser såen her ud:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```
Hvis i tvivl.
tjek tailwind homepage getting started

**slet app.css hvis du kører tailwind**

**Hent extension tailwind css intelisence**

**React icons (hvis du vil bruge dem)**
>npm i react-icons  


# OPSÆTNING AF SITE LAYOUT STRUKTUR

**Lav en fil layout.tsx i src mappen**
(layout.tsx) først, hvor du definerer strukturen og pladsholdere for Header, Footer, Navbar osv.


**lav en snippet i layout.tsx filen (React functional component).**

**Importer din header component og footer component.**

**Importer din outlet fra react (der hvor indeholdet skal komme fra i din main).**

**Importer scroll restoriation fra react (siden blir hvor du er scrollet til hvis du skifter side, ift login/logout f.eks.)**

**Det hele skal se sådan ud i din layout.tsx**

```ts
import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/Footer";
import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router";

export default function Layout() {
  

    return (
        <div>
          <ScrollRestoration />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
``


# COMPONENTS MAPPEN...

**lav components mappen inde i src mappen**


**lav en mappe kaldt "ui" inde i components mappen**
det er her din header, footer og navbar modules blir skabt.

**Lav nu en header, footer, navbar mappe i ui mappen**

**Lav nu en Header.tsx, en Footer.tsx og en Navbar.tsx fil i disse respektive nyskabte mapper**
>header/Header.tsx

>footer/Footer.tsx

>navbar/Navbar.tsx

**lav nu en mappe kaldt "base" inde i components mappen**
det er her du har genanvendelige components som buttons, inputs, formulare, newsletters osv.



# PAGES MAPPEN...

ny mappe kaldt "pages" under src og to nye filer i den mappe
ny fil Home.tsx
ny fil About.tsx
ect ect.

det representere siderne men er i realiteten components. derfor starter de også med stort bogstav.


i router.jsx,
importer nu siderne efterhånden som du skal bruge dem. 

import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import ListBolig from "./pages/ListBolig";
import ListMaeglere from "./pages/ListMaeglere";
import FavoriteHomes from "./pages/FavoriteHomes";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { homeLoader } from "./Loaders/HomeLoader";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
              loader: homeLoader
              
            },
            {
                path: 'list-homes',
                element: <ListBolig />
            },
            {
                path: 'list-maeglere',
                element: <ListMaeglere />
            },
            {
                path: 'favorite-homes',
                element: <FavoriteHomes />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },

            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
]);
export default router;




slet app.jsx og dens import i main.jsx, og opsæt routeren, så din main.jsx ender med at se sådan her ud:

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />   ----her!
  </StrictMode>,
)

og til sidst import router i main.jsx også:

import router from './router.tsx'
import { RouterProvider } from 'react-router'


hvis du bruger typescript så er det smart i sin src mappe at lave en "Type.ts" fil som kan samle alle dine types et sted, i stedet for de ligger spredt ud over diverse filer. på denne måde kan du importere dine types fra filer som skal bruge det. det ser mere overskueligt ud...

For at din side åbner automatisk når du tester,
i din package.json fil indsæt under scripts et open flag sådan her:
"dev": "vite --open"

nu kan du teste siden med:

npm run dev

lav et gitHub depository til din nye react opgave nu. huska at branche.

herfra kan du drag and drop alle dine filer fra skabelonen du lige har oprettet ind i det nye projekt. så burde det hele virke uden du skal igennem de her steps... selvfølgelig er det så med de daværende versioner af diverse pakker du får fra den dato din skabelon blev skabt.




