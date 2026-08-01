import { EditorialImage } from "@/components/ui/EditorialImage";
import { Clock, Calendar, BarChart2, ShieldCheck, Tag, FastForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description: string;
  image?: string;
  readingTime?: string;
  updatedAt?: string;
  publishedDate?: string;
  difficultyLevel?: "Beginner" | "Intermediate" | "Advanced";
  reviewedBy?: string;
  version?: string;
  nextReviewDate?: string;
  className?: string;
}

export function PageHero({
  title,
  description,
  image,
  readingTime,
  updatedAt,
  publishedDate,
  difficultyLevel,
  reviewedBy,
  version,
  nextReviewDate,
  className
}: PageHeroProps) {
  return (
    <div className={cn("relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-visible", className)}>
      {/* Background Image Container */}
      {image && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-900 rounded-b-[2.5rem]">
          <EditorialImage
            src={image}
            alt={title}
            fill
            variant="hero"
            priority
            className="opacity-70 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
      )}
      
      {!image && <div className="absolute inset-0 w-full h-full z-0 hero-gradient rounded-b-[2.5rem]" />}

      {/* Content that stays centered during scroll or moves up */}
      <div className="absolute inset-0 flex flex-col justify-end text-center sm:text-left px-4 sm:px-6 lg:px-8 z-10 pb-12 sm:pb-16 lg:pb-20 max-w-7xl mx-auto">
        <div className="flex flex-col items-center sm:items-start space-y-6 max-w-4xl">
          <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 text-[11px] font-bold tracking-widest uppercase text-white/90">
            {readingTime && (
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} min read
              </span>
            )}
            {difficultyLevel && (
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                <BarChart2 className="h-3.5 w-3.5" />
                {difficultyLevel}
              </span>
            )}
            {publishedDate && (
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                <Calendar className="h-3.5 w-3.5" />
                Published {publishedDate}
              </span>
            )}
            {updatedAt && (
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                <Calendar className="h-3.5 w-3.5" />
                Updated {updatedAt}
              </span>
            )}
            {version && (
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                <Tag className="h-3.5 w-3.5" />
                v{version}
              </span>
            )}
            {nextReviewDate && (
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-md border border-white/10">
                <FastForward className="h-3.5 w-3.5" />
                Next Review: {nextReviewDate}
              </span>
            )}
            {reviewedBy && (
              <span className="flex items-center gap-1.5 bg-emerald-900/40 px-3 py-1.5 rounded-md backdrop-blur-md border border-emerald-400/30 text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Reviewed by {reviewedBy}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            {title}
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
