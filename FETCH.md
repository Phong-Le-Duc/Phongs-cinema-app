# HOW TO FETCH:
(TYPESCRIPT)
opret en type.ts fil under src.
den fil skal fungere som en hub der angiver hvilken datatyper der bruges.
på denne måde har du et samlet sted hvorfra du kan exportere erklæringen af datatype til relevante filer som skal bruge det:
```ts
export type Agent = {
    id: string | number;
    name: string;
    email: string;
    phone: string | number;
}

```

1.
opret fil i component/common mappen. Kald den XxxFetchShell.tsx
importerer useLoaderData fra react og erklæring af datatyperne fra type.ts.
opret en et component (snippet ncmp) med en fallback function og en container som skal huse indholdet fra din fetch.
De forskellige endpoints skal du bruge fra relavant api.

```ts
import { useLoaderData } from "react-router"
import { type Agent } from "../../Types"

export default function XxxFetchShell() {
    let agents = useLoaderData() as Agent[]
    if (!agents || agents.length === 0) {
        return <div>No agents found</div>
    }
    return (
        <div>
            {agents.map(agent => (
                <div key={agent.id}>
                    <h3>{agent.name}</h3>
                    <p>{agent.email}</p>
                    <p>{agent.phone}</p>
                </div>
            ))}
        </div>
    )
}

```
3
Opret en loaders mappe under src mappen.
i den mappe, opret en XxxLoader.tsx. Denne fil skal indolde dit fetch.
importer igen erklæning af datatyper til typescript.
Til sidst opret fetchet.
(?_limit=3 begræns til 3 visninger)

```ts
import { type Agent } from "../Types.ts"
export async function fetchAgents(): Promise<Agent[]> {
    let response = await fetch('https://dinmaegler.onrender.com/agents?\_limit=3')
    let agents = await response.json()
        return agents
}
```


4
Tilføj loaderen på det relavante sted i router tsx.
 
 ```ts
{
  index: true,
  element: <Home />,
  loader: fetchAgents
  },
```

4a
derefter i routeren stadig, importer async functionen fra din XxxLoader.tsx fil.
```ts
import { fetchAgents } from "./Loaders/HomeLoader";
```
DONE!!
---------------------------------------
# MULTIPLE FETCHES PÅ SAMME SIDE.
man kan ikke tilføje flere loaders per link i router.tsx derfor,
HVIS MAN SKAL HENTE FLERE FETCHES SER KODEN LID ANDERLEDES UD...

1
XxxLoader.tsx ser sådan her ud:

```ts
import { type Agent, type Home } from "../Types.ts";

export async function homeLoader(): Promise<{ agents: Agent[]; homes: Home[] }> {
    const [agents, homes] = await Promise.all([
        fetch('https://dinmaegler.onrender.com/agents?_limit=3').then(res => res.json()),
        fetch('https://dinmaegler.onrender.com/homes?_limit=3').then(res => res.json())
    ]);
    return { agents, homes };
}
```

2
dine XxxFetchShell.tsx skal tweakes lidt:

```ts
import { useLoaderData } from "react-router"
import { type Agent } from "../../Types"

export default function AgentsFetchShell() {
    let { agents } = useLoaderData() as { agents: Agent[] };
    if (!agents || agents.length === 0) {
        return <div>No agents found</div>
    }

    return (
        <div>
            {agents.map(agent => (
                <div key={agent.id}>
                    <h3>{agent.name}</h3>
                    <p>{agent.email}</p>
                    <p>{agent.phone}</p>
                </div>
            ))}
        </div>
    )
}
```

og en anden fetch:

```ts
import { useLoaderData } from "react-router";
import { type Home } from "../../Types";

export default function HomeFetchShell() {
    let { homes } = useLoaderData() as { homes: Home[] };
    if (!homes || homes.length === 0) {
        return <div>No homes found</div>;
    }
    homes && console.log(homes);
    return (
        <div>
            {homes.map(home => (
                <div key={home.id}>
                    <h3>{home.type}</h3>
                    <p>{home.energylabel}</p>
                </div>
            ))}
        </div>
    );
}
```

det skulle være det!!

