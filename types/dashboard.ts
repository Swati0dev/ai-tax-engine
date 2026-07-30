import { ComparisonResult } from "@/lib/tax-calculations";

export interface SavedCalculationInputs {
  grossSalary: number;
  section80C: number;
  hraExemption: number;
  section80D: number;
}

export interface SavedChatConversation {
  id: string;
  title: string;
  timestamp: string;
}
