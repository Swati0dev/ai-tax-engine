import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { 
  Calculator, 
  Percent, 
  FileText, 
  TrendingUp, 
  Briefcase, 
  Calendar, 
  PiggyBank, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tax Calculators Hub | AI Tax Platform",
  description: "Explore our interactive calculators for Indian income tax, HRA, GST, TDS, take-home salary, and advance tax planning.",
};

const calculators = [
  {
    title: "Income Tax Regime Comparator",
    description: "Compare tax liability under the Old and New tax regimes with the latest July 2024 Budget updates.",
    href: "/calculators/income-tax-calculator",
    icon: Calculator,
    category: "Income Tax",
    badge: "Popular",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
  },
  {
    title: "80C Investment Planner",
    description: "Plan and track your tax-saving investments to maximize the ₹1.5 Lakh limit under Section 80C.",
    href: "/calculators/80c-planner",
    icon: PiggyBank,
    category: "Tax Saving",
    badge: "Essential",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20"
  },
  {
    title: "Find My ITR Form Wizard",
    description: "An intelligent questionnaire to quickly identify which ITR form you need to file this financial year.",
    href: "/calculators/find-my-itr",
    icon: FileText,
    category: "Filing",
    badge: "Filing season",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20"
  },
  {
    title: "HRA Exemption Calculator",
    description: "Determine the tax-exempt portion of your House Rent Allowance (HRA) using metro and non-metro rules.",
    href: "/calculators/hra-calculator",
    icon: ShieldCheck,
    category: "Salary",
    badge: "New",
    badgeColor: "bg-teal-500/10 text-teal-600 border-teal-500/20"
  },
  {
    title: "GST Calculator",
    description: "Quickly calculate inclusive and exclusive GST for slab rates of 5%, 12%, 18%, and 28%.",
    href: "/calculators/gst-calculator",
    icon: Percent,
    category: "Indirect Tax",
    badge: "New",
    badgeColor: "bg-teal-500/10 text-teal-600 border-teal-500/20"
  },
  {
    title: "TDS Estimator",
    description: "Calculate Tax Deducted at Source (TDS) under major sections: 192, 194C, 194I, and 194J.",
    href: "/calculators/tds-calculator",
    icon: Briefcase,
    category: "Business & Professional",
    badge: "New",
    badgeColor: "bg-teal-500/10 text-teal-600 border-teal-500/20"
  },
  {
    title: "Take-Home Salary Breakdown",
    description: "Compute your actual take-home pay by deducting EPF, Professional Tax, Gratuity, and Income Tax from your CTC.",
    href: "/calculators/salary-breakdown",
    icon: TrendingUp,
    category: "Salary",
    badge: "New",
    badgeColor: "bg-teal-500/10 text-teal-600 border-teal-500/20"
  },
  {
    title: "Advance Tax Installments Planner",
    description: "Estimate your yearly income tax and calculate your installment payments due in June, Sept, Dec, and March.",
    href: "/calculators/advance-tax",
    icon: Calendar,
    category: "Tax Planning",
    badge: "New",
    badgeColor: "bg-teal-500/10 text-teal-600 border-teal-500/20"
  }
];

export default function CalculatorsHubPage() {
  return (
    <main className="flex flex-col w-full pb-24 bg-background">
      <PageHero
        title="Calculators Hub"
        description="Simplify complex financial rules. Access our suite of real-time calculators tailored for the latest Indian tax laws."
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2022&auto=format&fit=crop"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <Breadcrumbs />

        <div className="mt-8 space-y-2">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Interactive Tax Calculators
          </h2>
          <p className="text-muted-foreground font-medium max-w-2xl">
            Compare regimes, evaluate exemptions, plan savings, and stay compliant with instant, accurate tax calculations.
          </p>
        </div>

        {/* Card Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc, idx) => {
            const Icon = calc.icon;
            return (
              <div 
                key={idx}
                className="group relative flex flex-col justify-between p-8 rounded-[2rem] bg-white border border-border/80 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted/50 px-3 py-1.5 rounded-xl">
                      {calc.category}
                    </span>
                    {calc.badge && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${calc.badgeColor}`}>
                        {calc.badge}
                      </span>
                    )}
                  </div>

                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {calc.title}
                  </h3>

                  <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8">
                    {calc.description}
                  </p>
                </div>

                <Link
                  href={calc.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-colors focus-visible:outline-none"
                >
                  Launch Calculator
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
