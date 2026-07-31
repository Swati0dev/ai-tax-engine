import Link from 'next/link'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/knowledge-hub" className="text-primary hover:underline mb-8 inline-block">&larr; Back to Knowledge Hub</Link>
        <h1 className="text-4xl font-bold capitalize mb-8">{category.replace('-', ' ')} Articles</h1>
        
        <div className="grid gap-6">
          <Link href={`/knowledge-hub/` + category + `/basics`} className="block p-6 bg-white rounded-2xl shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold">Introduction to {category.replace('-', ' ')}</h2>
            <p className="text-slate-500 mt-2">Learn the basics of {category.replace('-', ' ')} and how it applies to you.</p>
          </Link>
          <Link href={`/knowledge-hub/` + category + `/advanced`} className="block p-6 bg-white rounded-2xl shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold">Advanced Concepts</h2>
            <p className="text-slate-500 mt-2">Deep dive into complex scenarios and regulations.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
