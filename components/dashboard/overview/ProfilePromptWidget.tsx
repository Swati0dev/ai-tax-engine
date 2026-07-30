import { BadgeAlert, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProfilePromptWidgetProps {
  isProfileComplete: boolean | null;
}

export function ProfilePromptWidget({ isProfileComplete }: ProfilePromptWidgetProps) {
  if (isProfileComplete !== false) return null;

  return (
    <section className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
          <BadgeAlert className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-amber-900 text-lg">Your Tax Profile is Incomplete</h3>
          <p className="text-sm text-amber-700 font-medium">Complete your profile to unlock personalized AI guidance, tailored compliance dates, and accurate tax calculations.</p>
        </div>
      </div>
      <Link href="/onboarding" className="shrink-0">
        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl px-8 py-6 h-auto shadow-lg shadow-amber-500/20 w-full sm:w-auto">
          Complete Profile Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
