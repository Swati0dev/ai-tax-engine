"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all headings within the prose-editorial container
    const elements = Array.from(document.querySelectorAll(".prose-editorial h2, .prose-editorial h3"));
    
    // Add IDs to headings if they don't have them
    elements.forEach((el, index) => {
      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || `heading-${index}`;
      }
    });

    const items = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: Number(el.tagName.charAt(1)),
    }));
    
    setHeadings(items);

    // Setup intersection observer for active states
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -60% 0%" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hidden xl:block w-64 shrink-0 pl-4 py-8">
      <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-6">On this page</h4>
      <nav className="flex flex-col space-y-3">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(heading.id);
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className={cn(
              "text-sm transition-colors duration-200 border-l-2 pl-3 py-1 block",
              heading.level === 3 && "ml-4",
              activeId === heading.id 
                ? "border-primary text-primary font-medium" 
                : "border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-800"
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
