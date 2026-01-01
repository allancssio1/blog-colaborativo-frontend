import { useEffect } from "react";
import { usePosts } from "../hooks/usePosts";
import { PostList } from "../components/Posts/PostList";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { ErrorMessage } from "../components/Common/ErrorMessage";
import { useSearchParams } from "react-router-dom";

export default function PostsPage() {
  const { posts, loading, error, fetchPosts } = usePosts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  // Track if we have more posts potentially.
  // Ideally, backend returns total count. If not, we can infer.
  // Assuming if we got exactly 'limit' posts, there MIGHT be more.
  // Or request limit+1 to check. But simpler is just Next/Prev.

  useEffect(() => {
    fetchPosts(limit, offset);
  }, [fetchPosts, limit, offset]);

  const handleNext = () => {
    setSearchParams({ page: (page + 1).toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (page > 1) {
      setSearchParams({ page: (page - 1).toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Últimas Postagens</h1>
      </div>

      <PostList posts={posts} />

      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={page <= 1 || loading}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        <span className="text-sm font-medium">Página {page}</span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={posts.length < limit || loading}
        >
          Próxima
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
