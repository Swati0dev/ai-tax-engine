import { ArticleSchema } from "@/types/article";
import { PageHero } from "./PageHero";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { KeyTakeaways } from "@/components/ui/KeyTakeaways";
import { ExpertReview } from "@/components/ui/ExpertReview";
import { Callout } from "@/components/ui/Callout";
import { StepList } from "@/components/ui/StepList";
import { KeyMetrics } from "@/components/ui/KeyMetrics";
import { SummaryBox } from "@/components/ui/SummaryBox";
import { OfficialSources } from "@/components/ui/OfficialSources";
import { RegulatoryChangeBanner } from "@/components/ui/RegulatoryChangeBanner";

interface ArticleLayoutProps {
  article: ArticleSchema;
}

export function ArticleLayout({ article }: ArticleLayoutProps) {
  // Map blocks dynamically based on type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderBlock = (block: any) => {
    switch (block.type) {
      case "markdown":
        return <div key={block.id} className="prose-editorial max-w-none text-lg text-muted-foreground leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: block.content }} />;
      case "callout":
        return <Callout key={block.id} {...block.content} />;
      case "stepList":
        return <StepList key={block.id} {...block.content} />;
      case "keyMetrics":
        return <KeyMetrics key={block.id} {...block.content} />;
      case "summaryBox":
        return <SummaryBox key={block.id} {...block.content} />;
      case "custom":
        return <div key={block.id}>{block.content}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full pb-20">
      <ReadingProgressBar />
      
      {/* 1 & 2. Editorial Hero & Metadata */}
      <PageHero 
        title={article.title}
        description={article.summary}
        image={article.heroImage || "/hero-tax.png"}
        readingTime={article.metadata.readingTime}
        difficultyLevel={article.metadata.difficulty}
        reviewedBy={article.metadata.reviewedBy}
        updatedAt={article.metadata.lastUpdated}
        publishedDate={article.metadata.publishedDate}
        version={article.metadata.version}
        nextReviewDate={article.metadata.nextReviewDate}
      />

      <main className="relative z-10 bg-background mx-auto w-full px-4 sm:px-6 lg:px-8 py-0 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="mx-auto max-w-[90rem]">
          
          {/* Regulatory Change Banner (if present) */}
          {article.regulatoryChange && (
            <div className="flex justify-center xl:justify-start xl:ml-[17rem]">
              <RegulatoryChangeBanner change={article.regulatoryChange} />
            </div>
          )}

          {/* 3. Key Takeaways */}
          {article.keyTakeaways && (
            <div className="flex justify-center xl:justify-start xl:ml-[17rem]">
              <KeyTakeaways takeaways={article.keyTakeaways} />
            </div>
          )}

          <div className="flex flex-col xl:flex-row gap-12 mt-8">
            {/* 4. Table of Contents */}
            <TableOfContents />
            
            <div className="flex-1 max-w-4xl space-y-16">
              
              {/* 5, 6, 7, 8, 9. Article Sections mapped from Blocks */}
              <article className="space-y-12">
                {article.blocks.map(renderBlock)}
              </article>

              {/* 10. Official Sources */}
              {article.officialSources && (
                <OfficialSources sources={article.officialSources} />
              )}

              {/* 11. Expert Review */}
              {article.metadata.reviewedBy && (
                <ExpertReview 
                  reviewerName={article.metadata.reviewedBy}
                  reviewerTitle={article.metadata.reviewerTitle || "Expert Reviewer"}
                  reviewerAvatar={article.metadata.reviewerAvatar}
                  reviewDate={article.metadata.lastUpdated || article.metadata.publishedDate || ""}
                />
              )}

              {/* Related Articles placeholder */}
              {article.relatedArticleIds && article.relatedArticleIds.length > 0 && (
                <div className="pt-12 border-t border-slate-100 print:hidden">
                  <h3 className="text-2xl font-bold mb-6">Related Knowledge</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {article.relatedArticleIds.map((id) => (
                      <div key={id} className="p-6 rounded-2xl border bg-slate-50 text-slate-500 italic">
                        Related Article Card for ID: {id}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* Professional Print Footer */}
      <footer className="print-footer">
        Platform Name | Generated on {new Date().toLocaleDateString()} | Version {article.metadata.version || "1.0"} | URL: [Printed Copy]
      </footer>
    </div>
  );
}
