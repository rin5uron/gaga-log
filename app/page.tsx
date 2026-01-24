import { getAllPosts, getAllArtists } from "@/lib/posts";
import { getAllArtistProfiles } from "@/lib/artists";
import { getArtistSlug } from "@/lib/utils";
import PostList from "@/components/PostList";
import AdSenseUnit from "@/components/AdSenseUnit";

export default function Home() {
  const posts = getAllPosts();
  const artistsFromPosts = getAllArtists();
  
  // 専用アーティストページ（content/artists/）からもアーティスト名を取得
  const artistProfiles = getAllArtistProfiles();
  const artistsFromProfiles = artistProfiles.map((profile) => profile.name);
  
  // 両方をマージして重複を除去
  const allArtistsSet = new Set([...artistsFromPosts, ...artistsFromProfiles]);
  const artists = Array.from(allArtistsSet).sort();

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 pt-6 pb-12">
        {/* 検索とフィルター */}
        <div id="search" className="scroll-mt-20">
          <PostList posts={posts} artists={artists} />
        </div>

        {/* トップページの広告 */}
        {/* TODO: AdSense管理画面で広告ユニットを作成し、スロットIDを取得して設定してください */}
        {/* <AdSenseUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || "YOUR_SLOT_ID_HERE"} /> */}

        {/* サイト全体の更新日 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            {(() => {
              // 最新の投稿の更新日を取得
              const latestPost = posts.length > 0 ? posts[0] : null;
              const latestUpdateDate = latestPost?.updatedDate || latestPost?.date;
              return latestUpdateDate ? `サイト最終更新日：${latestUpdateDate}` : null;
            })()}
          </p>
        </div>
      </main>
    </div>
  );
}

