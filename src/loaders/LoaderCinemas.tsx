import { cinemas } from "../data/cinema_db";
import type { Cinema } from "../Types";

// This loader fetches cinemas near the user (simulated fetch with timeout)
export async function LoaderCinemas(): Promise<{ cinemas: Cinema[] }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return the cinemas array in an object, matching your fetch loaders
    return { cinemas };
}



