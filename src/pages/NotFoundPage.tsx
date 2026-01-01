import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">Página não encontrada</h2>
      <p className="text-muted-foreground max-w-sm">
        O recurso que você está procurando não existe ou foi movido.
      </p>
      <Link to="/posts">
        <Button size="lg" className="mt-4">
          Voltar para Posts
        </Button>
      </Link>
    </div>
  );
}
