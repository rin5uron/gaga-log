export function getArtistSlug(artist: string): string {
  return artist.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}
