import { Outlet } from 'react-router-dom';
import { Header } from './Header';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      <Header />
      <main className="flex-1 container py-8 md:py-12 animate-in fade-in duration-500">
        <Outlet />
      </main>
      <footer className="border-t py-6 md:py-8 bg-muted/40 mt-auto">
        <div className="container flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground text-center">
          <p>© {new Date().getFullYear()} Blog Colaborativo.</p>
          <p>Construído com React, TailwindCSS e ShadcnUi.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
