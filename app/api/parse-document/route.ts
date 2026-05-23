import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

export const maxDuration = 30; // Useful for Vercel deployment if parsing takes time

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided." }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ success: false, error: "Invalid file type. Only PDF is supported." }, { status: 400 });
    }

    // Convert to ArrayBuffer then Node Buffer (Ephemeral Processing - never written to disk)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse the PDF buffer in memory
    const data = await pdfParse(buffer);
    
    const text = data.text || "";
    
    // ----------------------------------------------------------------------
    // OCR Fallback Check
    // If the PDF contains very little text, it's likely a scanned image.
    // ----------------------------------------------------------------------
    if (text.trim().length < 50) {
      return NextResponse.json({ 
        success: false, 
        error: "Scanned document detected. OCR support is coming in a future update. Please upload a standard text-based PDF."
      }, { status: 400 });
    }

    // ----------------------------------------------------------------------
    // Heuristic/Regex Extractor Engine
    // ----------------------------------------------------------------------
    const extractAmount = (regex: RegExp): number => {
      const match = text.match(regex);
      if (match && match[1]) {
        // remove commas and whitespace
        const numStr = match[1].replace(/,/g, '').trim();
        const num = parseFloat(numStr);
        return isNaN(num) ? 0 : num;
      }
      return 0;
    };

    // Simple heuristic patterns (In production, you would map exact Form 16 coordinates or use AI)
    const grossSalary = 
      extractAmount(/Gross\s*Salary[^\d]*([\d,]+(?:\.\d{2})?)/i) || 
      extractAmount(/Total\s*Income[^\d]*([\d,]+(?:\.\d{2})?)/i);
    
    const section80C = extractAmount(/80C[^\d]*([\d,]+(?:\.\d{2})?)/i);
    const section80D = extractAmount(/80D[^\d]*([\d,]+(?:\.\d{2})?)/i);
    
    const hraExemption = 
      extractAmount(/House\s*Rent\s*Allowance(?:.*?exempt)?[^\d]*([\d,]+(?:\.\d{2})?)/i) || 
      extractAmount(/HRA[^\d]*([\d,]+(?:\.\d{2})?)/i);
    
    const tds = 
      extractAmount(/Tax\s*Deducted\s*at\s*Source[^\d]*([\d,]+(?:\.\d{2})?)/i) || 
      extractAmount(/TDS[^\d]*([\d,]+(?:\.\d{2})?)/i);

    return NextResponse.json({
      success: true,
      data: {
        grossSalary,
        section80C,
        section80D,
        hraExemption,
        tds,
        rawTextLength: text.length,
      }
    });

  } catch (err: unknown) {
    console.error("PDF Parsing Error:", err);
    return NextResponse.json({ 
      success: false, 
      error: err instanceof Error ? err.message : "Failed to parse document" 
    }, { status: 500 });
  }
}
