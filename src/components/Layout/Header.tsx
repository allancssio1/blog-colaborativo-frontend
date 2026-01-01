import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, PenSquare, User as UserIcon } from "lucide-react";
import { Navbar } from "./Navbar";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/posts" className="flex items-center space-x-2 mr-6">
            <span className="inline-block font-bold text-xl text-primary tracking-tight">Blog Colaborativo</span>
          </Link>
          <Navbar />
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-2 text-sm text-foreground bg-muted px-3 py-1.5 rounded-full">
                <UserIcon className="h-4 w-4" />
                <span className="font-medium max-w-[100px] truncate" title={user?.name}>{user?.name}</span>
              </div>
              <Link to="/create-post">
                <Button size="sm" className="gap-2 shadow-sm">
                  <PenSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Novo Post</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair" className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
               <Link to="/login">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Cadastrar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
