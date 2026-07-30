import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WelcomeSkeleton() {
  return (
    <Card className="rounded-[2.5rem] border-0 shadow-none bg-primary/5">
      <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-6">
        <Skeleton className="h-12 w-12 rounded-2xl" />
        <div className="space-y-3 flex flex-col items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardContent>
    </Card>
  );
}

export function FinancialSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <Card key={i} className="rounded-3xl border-slate-100 shadow-sm h-32">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ComplianceSkeleton() {
  return (
    <Card className="rounded-[2.5rem] border-primary/10 shadow-lg bg-white h-[300px]">
      <CardContent className="p-6 md:p-8 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ChatSkeleton() {
  return (
    <Card className="rounded-3xl border-slate-100 bg-white">
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-6 w-32 mb-4" />
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-12 flex-1 rounded-2xl" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function KnowledgeSkeleton() {
  return (
    <Card className="rounded-3xl border-slate-100 shadow-sm">
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-6 w-40 mb-4" />
        {[1, 2].map(i => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function CalculatorSkeleton() {
  return (
    <Card className="rounded-[2.5rem] border-slate-100 shadow-xl bg-white min-h-[400px]">
      <CardContent className="p-8 space-y-6">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
