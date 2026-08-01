import { DocumentUploader } from "@/components/tools/DocumentUploader";
import { FileSearch } from "lucide-react";

export default function AIDocumentReaderPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
            <FileSearch className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          AI Document Reader
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Upload your Form 16, salary slips, or GST invoices. Our AI will automatically extract the relevant tax data and calculate your liabilities.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <DocumentUploader />
        </div>
      </div>
    </div>
  );
}
