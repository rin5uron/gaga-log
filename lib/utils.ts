export function getArtistSlug(artist: string): string {
  return artist
    .toLowerCase()
    .replace(/\s*\+\s*/g, "-and-")  // "+" を "-and-" に変換
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}
