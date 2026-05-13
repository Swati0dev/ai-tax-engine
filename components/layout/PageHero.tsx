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
    <section className={cn("relative w-full min-h-[500px] flex items-center justify-center overflow-hidden border-b", className)}>
      {/* Background Image with Overlay */}
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" /> {/* Dark overlay for readability */}
        </div>
      )}
      
      {!image && <div className="absolute inset-0 -z-10 hero-gradient" />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold tracking-widest uppercase">
            {readingTime && (
              <span className="flex items-center gap-1.5 bg-white/10 text-white px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} min read
              </span>
            )}
            {updatedAt && (
              <span className="flex items-center gap-1.5 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full backdrop-blur-md border border-accent/30">
                <Calendar className="h-3.5 w-3.5" />
                Updated {updatedAt}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] max-w-4xl">
            {title}
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
