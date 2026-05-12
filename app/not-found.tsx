import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8 text-slate-400">
        <FileQuestion size={48} />
      </div>
      
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
        404 - Page Not Found
      </h1>
      
      <p className="text-lg text-slate-600 max-w-lg mb-10 leading-relaxed">
        The tax section or page you are looking for doesn&apos;t exist or has been moved to a new location.
      </p>

      <Link href="/">
        <Button size="lg" className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
          <ArrowLeft size={20} />
          Return to Dashboard
        </Button>
      </Link>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link href="/direct-tax" className="p-4 border rounded-xl hover:bg-slate-50 transition-colors">
          <h3 className="font-semibold text-slate-900">Direct Tax</h3>
          <p className="text-sm text-slate-500">Income Tax & Deductions</p>
        </Link>
        <Link href="/indirect-tax" className="p-4 border rounded-xl hover:bg-slate-50 transition-colors">
          <h3 className="font-semibold text-slate-900">Indirect Tax</h3>
          <p className="text-sm text-slate-500">GST & Customs</p>
        </Link>
        <Link href="/chat" className="p-4 border rounded-xl hover:bg-slate-50 transition-colors">
          <h3 className="font-semibold text-slate-900">AI Chat</h3>
          <p className="text-sm text-slate-500">Ask any tax question</p>
        </Link>
      </div>
    </div>
  );
}
