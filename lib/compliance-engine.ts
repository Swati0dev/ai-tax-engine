import { UserProfileData } from "@/actions/profile";

export interface ComplianceEvent {
  id: string;
  title: string;
  date: string;
  category: "DIRECT" | "INDIRECT" | "TDS";
  description: string;
  warning: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: string;
}

// Master lists
export const MASTER_TIMELINE_EVENTS: ComplianceEvent[] = [
  {
    id: "t1",
    title: "GST GSTR-1 Filing",
    date: "June 11, 2024",
    category: "INDIRECT",
    description: "Monthly return of outward supplies for taxpayers.",
    warning: "Late fee of ₹50/day (₹20/day for Nil returns) applies after due date."
  },
  {
    id: "t2",
    title: "Advance Tax 1st Installment",
    date: "June 15, 2024",
    category: "DIRECT",
    description: "Payment of 15% of estimated tax liability for FY 2024-25.",
    warning: "Interest under Section 234C (1% per month) applies for defaults."
  },
  {
    id: "t3",
    title: "GST GSTR-3B Filing",
    date: "June 20, 2024",
    category: "INDIRECT",
    description: "Monthly summary return and tax payment for outward & inward supplies.",
    warning: "Interest of 18% p.a. on unpaid tax liability + late fees."
  },
  {
    id: "t4",
    title: "ITR Filing for Individuals",
    date: "July 31, 2024",
    category: "DIRECT",
    description: "Deadline to file Income Tax Return for individuals, HUFs, and non-audit cases.",
    warning: "Section 234F penalty of up to ₹5,000 + 1% per month interest under Section 234A."
  },
  {
    id: "t5",
    title: "TDS Q1 Quarterly Return (Form 26Q)",
    date: "July 31, 2024",
    category: "TDS",
    description: "Filing of quarterly TDS return for non-salary payments for Q1 (April - June).",
    warning: "Section 234E late fee of ₹200 per day up to the TDS amount."
  },
  {
    id: "t6",
    title: "Advance Tax 2nd Installment",
    date: "September 15, 2024",
    category: "DIRECT",
    description: "Payment of 45% of estimated tax liability for FY 2024-25.",
    warning: "Interest under Section 234C applies for defaults."
  },
  {
    id: "t7",
    title: "Advance Tax 3rd Installment",
    date: "December 15, 2024",
    category: "DIRECT",
    description: "Payment of 75% of estimated tax liability for FY 2024-25.",
    warning: "Interest under Section 234C applies for defaults."
  },
  {
    id: "t8",
    title: "Advance Tax 4th Installment",
    date: "March 15, 2025",
    category: "DIRECT",
    description: "Payment of 100% of estimated tax liability for FY 2024-25.",
    warning: "Interest under Section 234C/234B applies for defaults."
  }
];

export const MASTER_CHECKLIST: ChecklistItem[] = [
  { id: "c1", label: "Download Form 16 from employer", category: "ITR" },
  { id: "c2", label: "Verify Form 26AS for TDS entries", category: "ITR" },
  { id: "c3", label: "Review Annual Information Statement (AIS)", category: "ITR" },
  { id: "c4", label: "Collect Interest Certificates from Banks", category: "ITR" },
  { id: "c5", label: "Gather investment proofs (ELSS, PPF, Insurance)", category: "ITR" },
  { id: "c6", label: "Check rent receipts & landlord PAN for HRA", category: "Salary" },
  { id: "c7", label: "Consolidate GST sale registers", category: "GST" },
  { id: "c8", label: "Reconcile Input Tax Credit (ITC) with GSTR-2B", category: "GST" },
  { id: "c9", label: "Prepare TDS deduction invoices and collect vendor PANs", category: "TDS" }
];

export function getDynamicComplianceDates(profile?: UserProfileData | null): ComplianceEvent[] {
  if (!profile) {
    // Return a default mixed set if profile is unknown
    return MASTER_TIMELINE_EVENTS.filter(e => ["t2", "t4", "t5"].includes(e.id));
  }

  const isBusiness = ["Business Owner", "Freelancer", "Creator"].includes(profile.occupation || "");
  const hasGST = profile.existingRegistrations?.includes("GST") || profile.businessStatus === "Registered" || profile.taxGoals?.includes("GST");
  
  return MASTER_TIMELINE_EVENTS.filter(event => {
    // GST deadlines only for those with GST
    if (event.category === "INDIRECT") {
      return hasGST;
    }
    // Advance tax for business or high income
    if (event.title.includes("Advance Tax")) {
      return isBusiness || ["7-15L", "15L+"].includes(profile.annualIncomeEstimate || "");
    }
    // TDS returns usually for businesses
    if (event.category === "TDS") {
      return isBusiness;
    }
    // Show ITR filing to everyone
    return true;
  });
}

export function getDynamicChecklist(profile?: UserProfileData | null): ChecklistItem[] {
  if (!profile) {
    return MASTER_CHECKLIST.filter(c => ["c1", "c2", "c3", "c4", "c5"].includes(c.id));
  }

  const isSalaried = profile.occupation === "Salaried";
  const isBusiness = ["Business Owner", "Freelancer", "Creator"].includes(profile.occupation || "");
  const hasGST = profile.existingRegistrations?.includes("GST") || profile.businessStatus === "Registered" || profile.taxGoals?.includes("GST");

  return MASTER_CHECKLIST.filter(item => {
    // Form 16 and HRA mostly for salaried
    if (item.id === "c1" || item.id === "c6") {
      return isSalaried;
    }
    // GST items
    if (item.category === "GST") {
      return hasGST;
    }
    // TDS items
    if (item.category === "TDS") {
      return isBusiness;
    }
    // Show generic ITR prep to everyone
    return true;
  });
}
