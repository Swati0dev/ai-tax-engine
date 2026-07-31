import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { EditorialImage } from "./EditorialImage";

interface ExpertReviewProps {
  reviewerName: string;
  reviewerTitle: string;
  reviewerAvatar?: string;
  reviewDate: string;
}

export function ExpertReview({ reviewerName, reviewerTitle, reviewerAvatar, reviewDate }: ExpertReviewProps) {
  return (
    <div className="flex items-center gap-4 p-4 md:p-6 bg-slate-50 border border-slate-100 rounded-2xl mb-12">
      {reviewerAvatar ? (
        <div className="w-16 h-16 shrink-0">
          <EditorialImage
            src={reviewerAvatar}
            alt={reviewerName}
            width={64}
            height={64}
            variant="avatar"
          />
        </div>
      ) : (
        <div className="w-16 h-16 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
          <ShieldCheck className="h-8 w-8" />
        </div>
      )}
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Expert Reviewed</span>
        </div>
        <h4 className="text-sm font-semibold text-slate-900 m-0">
          {reviewerName}
        </h4>
        <p className="text-sm text-slate-500 m-0">
          {reviewerTitle} • Reviewed on {reviewDate}
        </p>
      </div>
    </div>
  );
}
