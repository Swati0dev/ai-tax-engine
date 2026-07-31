import Link from 'next/link'
import { getKnowledgeItemBySlug } from '@/actions/tax';
import { TaxKnowledgeDetail } from '@/components/tax-section/TaxKnowledgeDetail';
import { AlertCircle } from 'lucide-react';

export default async function ArticlePage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { category, slug } = await params;
  
  const { data: article, success } = await getKnowledgeItemBySlug(slug);

  if (!success || !article) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-2">Article Not Found</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          We couldn&apos;t find the article you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <Link href={`/knowledge-hub/${category}`} className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
          Browse {category.replace('-', ' ')}
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="text-sm text-slate-500 flex items-center gap-2">
          <Link href="/knowledge-hub" className="hover:text-primary transition-colors">Knowledge Hub</Link>
          <span>/</span>
          <Link href={`/knowledge-hub/${category}`} className="hover:text-primary transition-colors capitalize">{category.replace('-', ' ')}</Link>
          <span>/</span>
          <span className="text-slate-900 capitalize font-medium line-clamp-1">{article.title}</span>
        </nav>
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <TaxKnowledgeDetail item={article as any} />
      
      {/* Dynamic FAQs Section */}
      {article.faqs && article.faqs.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid gap-6">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
