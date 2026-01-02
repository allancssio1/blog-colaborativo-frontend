import { useEffect, useCallback } from "react";
import { usePosts } from "../hooks/usePosts";
import { PostList } from "../components/Posts/PostList";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { ErrorMessage } from "../components/Common/ErrorMessage";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PostsPage() {
  const { posts, loading, error, fetchPosts } = usePosts();
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = 12;
  const offset = (page - 1) * limit;

  useEffect(() => {
    fetchPosts(limit, offset);
  }, [limit, offset, fetchPosts]);

  const handleNext = useCallback(() => {
    setSearchParams({ page: (page + 1).toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, setSearchParams]);

  const handlePrev = useCallback(() => {
    if (page > 1) {
      setSearchParams({ page: (page - 1).toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page, setSearchParams]);

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
        {isAuthenticated && (
          <Button asChild className="flex items-center gap-2 px-4 py-2 w-36">
            <Link to="/create-post">
              <Plus className="mr-2 h-4 w-4" />
              Novo Post
            </Link>
          </Button>
        )}
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
