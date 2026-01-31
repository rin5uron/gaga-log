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
        className="inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-300 group"
        title="Apple Musicで聴く"
      >
        <img
          src="/icons/apple-music.svg"
          alt="Apple Music"
          width="22"
          height="22"
          className="group-hover:scale-110 transition-transform duration-300"
        />
        <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">Apple Music</span>
      </a>

      <a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-300 group"
        title="Spotifyで聴く"
      >
        <img
          src="/icons/spotify.svg"
          alt="Spotify"
          width="22"
          height="22"
          className="group-hover:scale-110 transition-transform duration-300"
        />
        <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">Spotify</span>
      </a>
    </div>
  );
}
