import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { PostForm } from "../components/Posts/PostForm";
import { Loader2 } from "lucide-react";
import { ErrorMessage } from "../components/Common/ErrorMessage";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../hooks/useAuth";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error: fetchError, fetchPost, updatePost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Separate loading state for update if we want to differentiate from fetch loading
  // But usePosts has one 'loading' state. This might flicker if we use same 'loading' for both.
  // In `usePosts` implementation, `updatePost` sets `loading`.
  // `fetchPost` sets `loading`. 
  // Good enough for now.

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id, fetchPost]);

  useEffect(() => {
    if (post && user && post.author_id !== user.id) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para editar este post.",
        variant: "destructive",
      });
      navigate('/posts');
    }
  }, [post, user, navigate, toast]);

  const handleSubmit = async (data: { title: string; content: string }) => {
    if (!id) return;
    try {
      await updatePost(id, data);
      toast({
        title: "Sucesso",
        description: "Post atualizado com sucesso!",
        className: "bg-green-500 text-white",
      });
      navigate(`/posts/${id}`);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar post.",
        variant: "destructive",
      });
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
      
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <PostForm 
          initialData={{ title: post.title, content: post.content }}
          onSubmit={handleSubmit} 
          isLoading={loading} 
          submitLabel="Salvar Alterações" 
        />
      </div>
    </div>
  );
}
