import Link from 'next/link'

export default async function ArticlePage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { category, slug } = await params
  
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-sm mb-8 text-slate-500 flex items-center gap-2">
          <Link href="/knowledge-hub" className="hover:text-primary transition-colors">Knowledge Hub</Link>
          <span>/</span>
          <Link href={`/knowledge-hub/${category}`} className="hover:text-primary transition-colors capitalize">{category.replace('-', ' ')}</Link>
          <span>/</span>
          <span className="text-slate-900 capitalize font-medium">{slug.replace('-', ' ')}</span>
        </nav>

        {/* Article Header */}
        <h1 className="text-4xl font-bold text-slate-900 mb-6 capitalize">{slug.replace('-', ' ')}</h1>
        
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 pb-8 border-b">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-slate-700">Author:</span> Tax AI Expert
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-slate-700">Published:</span> {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-slate-700">Reading Time:</span> 5 min read
          </div>
        </div>

        {/* Content */}
        <div className="prose-editorial max-w-none">
          <p className="lead text-lg text-slate-600 mb-8">
            This is a dynamic article page for <strong>{slug.replace('-', ' ')}</strong> under the <strong>{category.replace('-', ' ')}</strong> category. The actual content will be fetched from the database or CMS in the future.
          </p>
          
          <h2>Overview</h2>
          <p>
            Taxation and compliance are foundational elements of running a successful enterprise in India. Understanding the nuances of <strong>{slug.replace('-', ' ')}</strong> ensures that you remain compliant with the latest regulations, thereby avoiding unnecessary penalties and maximizing your financial efficiency.
          </p>
          
          <h3>Key Considerations</h3>
          <ul>
            <li>Always maintain accurate financial records.</li>
            <li>Consult with a certified professional for complex scenarios.</li>
            <li>Stay updated with the latest circulars from the tax department.</li>
          </ul>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 my-8">
            <h4 className="text-blue-900 font-bold mb-2">Important Notice</h4>
            <p className="text-blue-800 text-sm m-0">The information provided here is for educational purposes and should not be construed as professional financial or legal advice.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
