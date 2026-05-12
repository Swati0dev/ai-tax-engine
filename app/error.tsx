"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to our centralized logger
    logger.error("Global Application Error", { 
      message: error.message, 
      stack: error.stack,
      digest: error.digest 
    });
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600 animate-pulse">
        <AlertTriangle size={40} />
      </div>
      
      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        Something went wrong
      </h1>
      
      <p className="text-slate-600 max-w-md mb-8">
        We encountered an unexpected error while processing your request. Our team has been notified.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={() => reset()}
          className="flex items-center gap-2"
        >
          <RefreshCcw size={18} />
          Try Again
        </Button>
        
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home size={18} />
            Back to Home
          </Button>
        </Link>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="mt-12 p-4 bg-slate-100 rounded-lg text-left max-w-2xl overflow-auto border border-slate-200">
          <p className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">Debug Info</p>
          <pre className="text-sm text-red-700 font-mono">
            {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </div>
      )}
    </div>
  );
}
