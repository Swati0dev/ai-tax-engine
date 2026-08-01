import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DownloadsPage() {
  const categories = [
    {
      title: "Income Tax Forms (AY 2024-25)",
      files: [
        { name: "ITR-1 (Sahaj) Form", type: "PDF", size: "2.1 MB" },
        { name: "ITR-2 Form", type: "PDF", size: "3.4 MB" },
        { name: "ITR-3 Form", type: "PDF", size: "4.8 MB" },
        { name: "ITR-4 (Sugam) Form", type: "PDF", size: "2.8 MB" },
        { name: "Form 16 Format", type: "XLSX", size: "150 KB" }
      ]
    },
    {
      title: "GST Returns & Challans",
      files: [
        { name: "GSTR-1 Format", type: "PDF", size: "1.2 MB" },
        { name: "GSTR-3B Format", type: "PDF", size: "980 KB" },
        { name: "GST PMT-09 (Challan)", type: "PDF", size: "850 KB" },
        { name: "GSTR-9 (Annual Return)", type: "PDF", size: "3.1 MB" }
      ]
    },
    {
      title: "Utilities & Checklists",
      files: [
        { name: "Section 80C Investment Tracker", type: "XLSX", size: "120 KB" },
        { name: "Capital Gains Calculator Offline", type: "XLSX", size: "450 KB" },
        { name: "Startup Compliance Checklist", type: "PDF", size: "500 KB" }
      ]
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-4">
          <Download className="h-10 w-10 text-indigo-600" />
          Official Forms & Downloads
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-3xl">
          Download blank ITR forms, GST return formats, offline utilities, and compliance checklists directly from official sources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((category, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-indigo-100 pb-2">{category.title}</h2>
            <div className="space-y-4">
              {category.files.map((file, fIdx) => (
                <Card key={fIdx} className="group hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${file.type === 'PDF' ? 'bg-red-50' : 'bg-emerald-50'}`}>
                      {file.type === 'PDF' ? (
                        <FileText className={`h-6 w-6 ${file.type === 'PDF' ? 'text-red-500' : 'text-emerald-500'}`} />
                      ) : (
                        <FileSpreadsheet className="h-6 w-6 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{file.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{file.type} • {file.size}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 text-slate-400 transition-colors">
                      <Download className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
