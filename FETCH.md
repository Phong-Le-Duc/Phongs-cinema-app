# GUIDE: FETCH OG LOADER I REACT ROUTER
**Kronologisk guide fra start til slut**

---

## 📋 OVERSIGT - DATA FLOW
```
API → Loader → Router → Page → Section → Component
```

---

## TRIN 1: DEFINER DATATYPER
**Fil:** `src/Types.ts`  
**Hvorfor først?** Så TypeScript ved hvad du arbejder med

```ts
export type Agent = {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    overview: string;
}
```

---

## TRIN 2: OPRET LOADER (FETCH DATA)
**Fil:** `src/loaders/AgentLoader.tsx`  
**Hvad gør den?** Henter data fra API

```ts
import { type Agent } from "../Types"

export async function AgentLoader(): Promise<{ agents: Agent[] }> {
    const response = await fetch('https://dinmaegler.onrender.com/agents?_limit=3');
    
    if (!response.ok) {
        throw new Error("Failed to fetch agents");
    }
    
    const agents = await response.json();
    return { agents };  // Wrap i object!
}
```

**⚠️ VIGTIGT:** Return altid et object `{ agents }`, ikke bare array!

---

## TRIN 3: FORBIND LOADER TIL ROUTER
**Fil:** `src/router.tsx`

### 3a. Importer loader
```ts
import { AgentLoader } from "./loaders/AgentLoader";
```

### 3b. Tilføj til route
```ts
{
    path: '/',
    element: <Home />,
    loader: AgentLoader  // ← Forbinder loader
}
```

---

## TRIN 4: HENT DATA I PAGE COMPONENT
**Fil:** `src/pages/Home.tsx`  
**Hvad gør den?** Modtager data og sender videre

```ts
import { useLoaderData } from "react-router"
import { type Agent } from "../Types"
import AgentSection from "../components/sections/AgentSection"

export default function Home() {
    const { agents } = useLoaderData() as { agents: Agent[] };
    
    return (
        <>
            <AgentSection agents={agents} />
        </>
    )
}
```

---

## TRIN 5: VIS DATA I SECTION COMPONENT
**Fil:** `src/components/sections/AgentSection.tsx`  
**Hvad gør den?** Mapper gennem data og viser det

```ts
import { type Agent } from "../../Types"

export default function AgentSection({ agents }: { agents: Agent[] }) {
    
    // Fallback hvis ingen data
    if (!agents || agents.length === 0) {
        return <div>No agents found</div>
    }
    
    return (
        <section>
            <h2>Our Agents</h2>
            <div className="grid grid-cols-3 gap-4">
                {agents.map(agent => (
                    <div key={agent.id}>
                        <h3>{agent.name}</h3>
                        <p>{agent.email}</p>
                        <p>{agent.phone}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
```

**✅ DONE!**






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

