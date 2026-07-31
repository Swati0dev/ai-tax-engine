import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface EditorialImageProps extends Omit<ImageProps, "alt"> {
  alt: string; // Enforce alt text for accessibility
  caption?: string;
  variant?: "default" | "hero" | "avatar" | "inline";
}

export function EditorialImage({ 
  alt, 
  caption, 
  variant = "default", 
  className, 
  ...props 
}: EditorialImageProps) {
  
  // Base premium image treatment
  const baseClasses = "object-cover transition-all duration-300";
  
  // Variant specific styling
  const variants = {
    default: "w-full h-auto rounded-2xl border border-border/50 shadow-sm hover:shadow-md",
    hero: "w-full h-full",
    avatar: "rounded-full border border-border/50 object-cover",
    inline: "rounded-lg border border-border/50 shadow-sm"
  };

  return (
    <figure className={cn("relative flex flex-col items-center w-full group", variant === "default" && "my-8", variant === "inline" && "my-4")}>
      <div className={cn("relative overflow-hidden w-full h-full bg-slate-50", variants[variant], variant !== "hero" && "group-hover:ring-1 group-hover:ring-primary/20 transition-all duration-300")}>
        <Image 
          alt={alt}
          className={cn(baseClasses, "grayscale-[0.1] contrast-[0.95] group-hover:grayscale-0 group-hover:contrast-100", className)}
          {...props}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-[inherit]" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground italic text-center max-w-[80%]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
