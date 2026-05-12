"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on the homepage
  if (pathname === "/") return null;

  const paths = pathname.split("/").filter((path) => path !== "");
  
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground font-medium">
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-primary transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          const label = path
            .replace(/-/g, " ")
            .replace(/^\w/, (c) => c.toUpperCase());

          return (
            <li key={path} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              {isLast ? (
                <span className="text-foreground font-bold" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-primary transition-colors capitalize"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
