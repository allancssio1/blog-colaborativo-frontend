import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { PostForm } from "../components/Posts/PostForm";
import { Loader2 } from "lucide-react";
import { ErrorMessage } from "../components/Common/ErrorMessage";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error: fetchError, fetchPost, updatePost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // fetchPost é estável (useCallback sem deps)

  useEffect(() => {
    if (post && user && post.author_id !== user.id) {
      toast.error("Você não tem permissão para editar este post.");
      navigate('/posts');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, user]); // navigate é estável

  const handleSubmit = async (data: { title: string; content: string }) => {
    if (!id) return;
    try {
      await updatePost(id, data);
      toast.success("Post atualizado com sucesso!");
      navigate(`/posts/${id}`);
    } catch (err) {
      toast.error("Falha ao atualizar post.");
    }
  };

  if (loading && !post) {
     return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (fetchError) {
    return <ErrorMessage message={fetchError} />;
  }

  if (!post) {
    return <ErrorMessage message="Post não encontrado" />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Editar Post</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <PostForm
            initialData={{ title: post.title, content: post.content }}
            onSubmit={handleSubmit}
            isLoading={loading}
            submitLabel="Salvar Alterações"
          />
        </CardContent>
      </Card>
    </div>
  );
}
