// Get all favorite house IDs from localStorage
export function getFavoriteIds(): string[] {
    // Try to read the array from localStorage, or return an empty array if not found
    return JSON.parse(localStorage.getItem("favoriteHouseIds") || "[]");
}

// Add a house ID to favorites in localStorage
export function addFavorite(id: string) {
    const ids = getFavoriteIds(); // Get current favorites
    if (!ids.includes(id)) {      // Only add if not already a favorite
        ids.push(id);
        localStorage.setItem("favoriteHouseIds", JSON.stringify(ids)); // Save updated array
    }
}

// Remove a house ID from favorites in localStorage
export function removeFavorite(id: string) {
    // Filter out the given ID from the favorites array
    const ids = getFavoriteIds().filter(favId => favId !== id);
    localStorage.setItem("favoriteHouseIds", JSON.stringify(ids)); // Save updated array
}

// Check if a house ID is in favorites
export function isFavorite(id: string): boolean {
    return getFavoriteIds().includes(id); // Returns true if ID is in favorites
}