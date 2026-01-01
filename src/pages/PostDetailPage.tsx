import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { PostDetail } from "../components/Posts/PostDetail";
import { Loader2 } from "lucide-react";
import { ErrorMessage } from "../components/Common/ErrorMessage";
import { useToast } from "@/components/ui/use-toast";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error, fetchPost, removePost } = usePosts();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id, fetchPost]);

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await removePost(id);
      toast({
        title: "Sucesso",
        description: "Post deletado com sucesso.",
        className: "bg-green-500 text-white",
      });
      navigate("/posts");
    } catch (err) {
      // Error is set in the hook and can be displayed, or we toast it here
      toast({
        title: "Erro",
        description: "Não foi possível deletar o post.",
        variant: "destructive",
      });
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

import { Button } from "@/components/ui/button";
