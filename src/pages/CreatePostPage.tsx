import { usePosts } from "../hooks/usePosts";
import { PostForm } from "../components/Posts/PostForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ErrorMessage } from "../components/Common/ErrorMessage";
import { Card, CardContent } from "@/components/ui/card";

export default function CreatePostPage() {
  const { createPost, loading, error } = usePosts();
  const navigate = useNavigate();

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      await createPost(data);
      toast.success("Post criado com sucesso!");
      navigate("/posts");
    } catch (err) {
      toast.error("Falha ao criar post.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Criar Novo Post</h1>
        <p className="text-muted-foreground">Compartilhe suas ideias com a comunidade</p>
      </div>
      
      {error && <ErrorMessage message={error} />}

      <Card>
        <CardContent className="pt-6">
          <PostForm
            onSubmit={handleSubmit}
            isLoading={loading}
            submitLabel="Publicar Post"
          />
        </CardContent>
      </Card>
    </div>
  );
}
