import Link from 'next/link'
import { getKnowledgeItems, slugToTaxCategory } from '@/actions/tax';
import { BookOpen, AlertCircle, FileText } from 'lucide-react';
import { ReviewBadge } from '@/components/tax-section/ReviewBadge';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const mappedCategory = await slugToTaxCategory(category);
  
  if (!mappedCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Category Not Found</h1>
          <p className="text-muted-foreground">The requested tax category does not exist.</p>
          <Link href="/knowledge-hub" className="text-primary hover:underline inline-block mt-4">
            Return to Knowledge Hub
          </Link>
        </div>
      </div>
    )
  }

  const { data: articles, success } = await getKnowledgeItems(mappedCategory);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-6">
          <Link href="/knowledge-hub" className="text-primary hover:underline flex items-center gap-2">
            &larr; Back to Knowledge Hub
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold capitalize">{category.replace('-', ' ')} Resource Center</h1>
              <p className="text-lg text-muted-foreground mt-2">
                Official guidelines, rules, and procedures for {category.replace('-', ' ')}.
              </p>
            </div>
          </div>
        </header>
        
        {success && articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link 
                key={article.slug} 
                href={`/knowledge-hub/${category}/${article.slug}`}
                className="group flex flex-col bg-white rounded-3xl p-6 border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20 shadow-sm">
                    {article.actName}
                  </span>
                  <ReviewBadge status={article.reviewStatus} />
                </div>
                
                <h2 className="text-xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {article.summary}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <FileText className="h-4 w-4" />
                    {article.faqs.length} FAQs
                  </div>
                  <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700">No Articles Found</h3>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              We are currently updating our database with the latest official guidelines for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
