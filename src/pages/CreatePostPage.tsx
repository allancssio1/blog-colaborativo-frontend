import { usePosts } from "../hooks/usePosts";
import { PostForm } from "../components/Posts/PostForm";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ErrorMessage } from "../components/Common/ErrorMessage";

export default function CreatePostPage() {
  const { createPost, loading, error } = usePosts();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      await createPost(data);
      toast({
        title: "Sucesso",
        description: "Post criado com sucesso!",
        className: "bg-green-500 text-white", // Optional custom styling
      });
      navigate("/posts");
    } catch (err) {
      // Error is stored in 'error' state, but we can also toast
      toast({
        title: "Erro",
        description: "Falha ao criar post.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Criar Novo Post</h1>
        <p className="text-muted-foreground">Compartilhe suas ideias com a comunidade</p>
      </div>
      
      {error && <ErrorMessage message={error} />}
      
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <PostForm 
          onSubmit={handleSubmit} 
          isLoading={loading} 
          submitLabel="Publicar Post" 
        />
      </div>
    </div>
  );
}
