import Link from "next/link";
import { 
  ArrowRight, 
  Search,
  BookOpen, 
  PlayCircle,
  TrendingUp, 
  Sparkles, 
  Lightbulb, 
  Calculator,
  BrainCircuit,
  Newspaper,
  CheckCircle2,
  Clock,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { getKnowledgeItems } from "@/actions/tax";

export const metadata = constructMetadata({
  title: "AI Tax Engine | Simplified Indian Tax Compliance",
  description: "Navigate Indian tax compliance, filing, and learning with ease using the AI Tax Engine.",
});

export default async function HomePage() {
  const { data: allItems } = await getKnowledgeItems();
  
  // Sort and filter for different sections
  const safeItems = allItems || [];
  
  // Latest Updates (sorted by updatedAt)
  const latestUpdates = [...safeItems].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 4);
  
  // Featured / Knowledge Recommendations (just picking top 3 for now)
  const recommendations = [...safeItems].slice(0, 3);
  
  // Extract unique categories for Popular Categories
  const uniqueCategories = Array.from(new Set(safeItems.map(item => item.category)));

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent blur-3xl opacity-50 -z-0"></div>
        
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-xs font-bold text-emerald-400 mb-8 shadow-sm">
            <Sparkles className="h-4 w-4" />
            AI-Powered Tax & Business Guidance
          </div>
          
          <h1 className="text-4xl font-heading font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl mb-8 leading-[1.1]">
            Learn Tax Like <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Never Before</span>
          </h1>
          
          {/* Main Search Bar */}
          <div className="w-full max-w-2xl mx-auto mb-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-white rounded-full p-2 shadow-2xl">
              <Search className="h-6 w-6 text-slate-400 ml-4" />
              <input 
                type="text" 
                placeholder="Search across all official tax concepts..." 
                className="w-full bg-transparent border-none py-3 px-4 text-slate-900 text-lg focus:outline-none placeholder:text-slate-400 font-medium"
              />
              <Button className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 font-bold text-base">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Knowledge Recommendations (CMS Driven) */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-heading flex items-center gap-2 text-slate-900">
                <BookOpen className="h-6 w-6 text-primary" /> Knowledge Recommendations
              </h2>
              <Link href="/knowledge-hub" className="text-sm font-bold text-primary hover:underline flex items-center">
                View Knowledge Hub <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map(article => (
                <div key={article.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">{article.category.replace('_', ' ')}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{article.title}</h3>
                    <p className="text-sm text-slate-600 font-medium mb-4 line-clamp-3">{article.summary}</p>
                  </div>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 mt-4">
                    <Link href={`/knowledge-hub/${article.category.toLowerCase().replace('_', '-')}/${article.slug}`}>Read Article</Link>
                  </Button>
                </div>
              ))}
              {recommendations.length === 0 && (
                <div className="col-span-3 text-center text-muted-foreground py-8">No articles found in CMS.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Categories (CMS Driven) */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-extrabold text-slate-900 sm:text-4xl">
              Explore by Category
            </h2>
            <p className="text-slate-600 font-medium mt-4">
              Browse official guidelines and articles organized by tax domains.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {uniqueCategories.map((cat, idx) => {
              const slug = cat.toLowerCase().replace('_', '-');
              return (
                <Link key={idx} href={`/knowledge-hub/${slug}`} className="group relative bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-[300px]">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors capitalize">{cat.replace('_', ' ')}</h3>
                  <div className="flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                    View Articles <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              )
            })}
            {uniqueCategories.length === 0 && (
              <div className="text-center text-muted-foreground py-8">No categories found in CMS.</div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Interactive Tools & AI */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-heading font-extrabold text-slate-900 sm:text-4xl">
                Interactive Tools
              </h2>
              <p className="text-slate-600 font-medium mt-4">
                Calculate, simulate, and get AI-driven answers in seconds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/calculators/income-tax-calculator" className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-3">
              <Calculator className="h-8 w-8 text-slate-400" />
              <span className="font-bold text-slate-900">Income Tax Calc</span>
            </Link>
            
            {/* Featured AI Tool */}
            <Link href="/chat" className="lg:col-span-3 bg-slate-900 p-8 rounded-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/50 transition-colors duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold mb-4 backdrop-blur-sm border border-white/10">
                    <BrainCircuit className="h-3.5 w-3.5 text-emerald-400" /> Powered by Gemini
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Tax AI Assistant</h3>
                  <p className="text-slate-300 font-medium max-w-sm">Have a complex question? Ask our AI in Hindi, English, or Hinglish for instant, legally-backed advice.</p>
                </div>
                <div className="mt-8 flex items-center text-emerald-400 font-bold">
                  Ask a question <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Latest Government Updates (CMS Driven) */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold font-heading flex items-center gap-2 text-slate-900">
              <Newspaper className="h-6 w-6 text-primary" /> Latest Updates
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestUpdates.map((news) => (
              <Link 
                key={news.id} 
                href={`/knowledge-hub/${news.category.toLowerCase().replace('_', '-')}/${news.slug}`}
                className="group cursor-pointer block"
              >
                <div className="text-xs font-bold text-slate-400 mb-2">
                  {new Date(news.updatedAt).toLocaleDateString()} • {news.category.replace('_', ' ')}
                </div>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                  {news.title}
                </h4>
              </Link>
            ))}
            {latestUpdates.length === 0 && (
              <div className="col-span-4 text-muted-foreground">No updates available.</div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
