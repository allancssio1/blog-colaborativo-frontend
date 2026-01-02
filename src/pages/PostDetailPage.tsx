import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { PostDetail } from "../components/Posts/PostDetail";
import { Loader2 } from "lucide-react";
import { ErrorMessage } from "../components/Common/ErrorMessage";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error, fetchPost, removePost } = usePosts();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // fetchPost é estável (useCallback sem deps)

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await removePost(id);
      toast.success("Post deletado com sucesso.");
      navigate("/posts");
    } catch (err) {
      toast.error("Não foi possível deletar o post.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
        <div className="max-w-3xl mx-auto">
             <ErrorMessage message={error} />
             <div className="mt-4 text-center">
                 <Button onClick={() => navigate('/posts')} variant="outline">Voltar para lista</Button>
             </div>
        </div>
    );
  }

  if (!post) {
    return ( // Should ideally redirect to NotFound or show message
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Post não encontrado</h2>
        <Button onClick={() => navigate('/posts')} variant="link">Voltar para lista</Button>
      </div>
    );
  }

  return <PostDetail post={post} onDelete={handleDelete} isDeleting={isDeleting} />;
}
