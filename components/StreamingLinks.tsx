interface StreamingLinksProps {
  appleMusicUrl: string;
  spotifyUrl: string;
}

export default function StreamingLinks({ appleMusicUrl, spotifyUrl }: StreamingLinksProps) {
  return (
    <div className="flex gap-3 my-6">
      <a
        href={appleMusicUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow"
        title="Apple Musicで聴く"
      >
        <img src="/icons/apple-music.svg" alt="Apple Music" width="20" height="20" />
        <span className="text-sm font-medium text-gray-700">Apple Music</span>
      </a>

      <a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow"
        title="Spotifyで聴く"
      >
        <img src="/icons/spotify.svg" alt="Spotify" width="20" height="20" />
        <span className="text-sm font-medium text-gray-700">Spotify</span>
      </a>
    </div>
  );
}
