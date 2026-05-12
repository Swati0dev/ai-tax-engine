import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description: string;
  image?: string;
  readingTime?: string;
  updatedAt?: string;
  className?: string;
}

export function PageHero({
  title,
  description,
  image,
  readingTime,
  updatedAt,
  className
}: PageHeroProps) {
  return (
    <section className={cn("relative w-full py-16 lg:py-24 overflow-hidden hero-gradient border-b", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-wrap gap-4 text-xs font-bold text-primary tracking-widest uppercase mb-2">
              {readingTime && (
                <span className="flex items-center gap-1.5 bg-primary/5 px-3 py-1.5 rounded-full">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime} min read
                </span>
              )}
              {updatedAt && (
                <span className="flex items-center gap-1.5 bg-accent/5 text-accent px-3 py-1.5 rounded-full">
                  <Calendar className="h-3.5 w-3.5" />
                  Updated {updatedAt}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              {title}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed font-medium">
              {description}
            </p>
          </div>
          
          {image && (
            <div className="relative aspect-[16/9] lg:aspect-square rounded-3xl overflow-hidden glass-card animate-float premium-shadow">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl -z-10 rounded-full mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent/5 blur-3xl -z-10 rounded-full mix-blend-multiply" />
    </section>
  );
}
