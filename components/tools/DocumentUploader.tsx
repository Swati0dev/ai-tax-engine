"use client";

import { useState, useRef } from "react";
import { UploadCloud, File, AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExtractedData {
  grossSalary: number;
  section80C: number;
  section80D: number;
  hraExemption: number;
  tds: number;
}

interface DocumentUploaderProps {
  onExtractSuccess?: (data: ExtractedData) => void;
}

export function DocumentUploader({ onExtractSuccess }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return false;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/parse-document", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        if (onExtractSuccess && result.data) {
          onExtractSuccess(result.data);
        }
      } else {
        setError(result.error || "Extraction failed. Please try again.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full space-y-4">
      {!file ? (
        <div
          className={cn(
            "relative w-full rounded-[2.5rem] border-2 border-dashed p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer group",
            isDragging 
              ? "border-primary bg-primary/5 shadow-inner" 
              : "border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="application/pdf"
            onChange={handleFileSelect}
          />
          <div className="h-16 w-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-indigo-500 mb-5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h4 className="text-xl font-extrabold tracking-tight text-foreground">Upload Form 16</h4>
          <p className="text-sm text-muted-foreground font-semibold mt-2 max-w-sm mx-auto leading-relaxed">
            Drag and drop your PDF here. It will be parsed entirely in-memory.
          </p>
          <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span className="bg-slate-100 px-2 py-1 rounded">Max 5MB</span>
            <span>&bull;</span>
            <span className="bg-slate-100 px-2 py-1 rounded">Text-based PDF only</span>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500">
                <File className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground line-clamp-1">{file.name}</h4>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5 block">
                  {(file.size / 1024 / 1024).toFixed(2)} MB &bull; PDF
                </span>
              </div>
            </div>
            {!isUploading && !success && (
              <button onClick={clearFile} className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 rounded-[1.5rem] bg-rose-50 border border-rose-100 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-rose-800 leading-relaxed">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-6 p-4 rounded-[1.5rem] bg-emerald-50 border border-emerald-100 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-emerald-800 leading-relaxed">
                Extraction complete! We&apos;ve automatically filled your tax calculators.
              </p>
            </div>
          )}

          {!success && !error && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={cn(
                "w-full mt-6 rounded-[1.5rem] py-3.5 text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2",
                isUploading 
                  ? "bg-slate-400 cursor-not-allowed shadow-none" 
                  : "bg-primary hover:bg-primary/95 hover:shadow-primary/20"
              )}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Extracting securely in-memory...
                </>
              ) : (
                "Extract Tax Data"
              )}
            </button>
          )}

          {success && (
            <button
              onClick={clearFile}
              className="w-full mt-3 rounded-[1.5rem] py-3 text-xs font-bold text-muted-foreground hover:bg-slate-50 hover:text-foreground transition-all"
            >
              Upload Another Form
            </button>
          )}
        </div>
      )}
    </div>
  );
}
