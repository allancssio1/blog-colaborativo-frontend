import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { href: "/posts", label: "Posts" },
    // Add more if needed. "Novo Post" is usually a CTA, not a nav link, but can be here.
    // The requirement says "Header with ... links".
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === item.href
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
