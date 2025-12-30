import { getAllPosts, getAllArtists } from "@/lib/posts";
import PostList from "@/components/PostList";

export default function Home() {
  const posts = getAllPosts();
  const artists = getAllArtists();

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 pt-6 pb-12">
        <PostList posts={posts} artists={artists} />
      </main>
    </div>
  );
}

