import { Users, Database, MessageSquare, TrendingUp, Activity, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Fetch real data from the database concurrently
  const [
    totalUsers,
    totalKnowledgeItems,
    pendingReviews,
    totalChats,
    totalCalculations,
    recentUsers
  ] = await Promise.all([
    prisma.user.count(),
    prisma.taxKnowledgeItem.count(),
    prisma.taxKnowledgeItem.count({
      where: { reviewStatus: { in: ['DRAFT', 'NEEDS_REVIEW'] } }
    }),
    prisma.chatConversation.count(),
    prisma.savedCalculation.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, createdAt: true, role: true }
    })
  ]);

  const STATS = [
    { title: "Total Users", value: totalUsers.toLocaleString(), trend: "Registered accounts", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Tax Knowledge Items", value: totalKnowledgeItems.toLocaleString(), trend: `${pendingReviews} pending review`, icon: Database, color: "text-indigo-500", bg: "bg-indigo-50" },
    { title: "Active AI Chats", value: totalChats.toLocaleString(), trend: "Total conversations", icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Saved Calculations", value: totalCalculations.toLocaleString(), trend: "User tax plans", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50" }
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Admin Overview</h1>
        <p className="text-sm text-muted-foreground font-medium mt-1">
          High-level metrics and system status directly from the live database.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <Card key={idx} className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Activity className="h-4 w-4 text-slate-300" />
              </div>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-bold text-slate-500">{stat.title}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 px-2">Recent Platform Activity</h3>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="p-0 divide-y divide-slate-100">
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <div key={user.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {user.role === 'ADMIN' ? 'New Admin registered' : 'New user registered'}
                        </p>
                        <p className="text-xs text-slate-500">{user.email || user.name || "Unknown user"}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-400">
                      {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  No recent activity found.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 px-2">Quick Actions</h3>
          <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <Link href="/admin/knowledge" className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group text-left">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Database className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Manage Tax Knowledge</h4>
                  <p className="text-xs text-slate-500">Review pending AI drafts</p>
                </div>
              </Link>
              <Link href="/api/admin/seed-missing" target="_blank" className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group text-left">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Trigger Crawl Sync</h4>
                  <p className="text-xs text-slate-500">Run manual fetch override</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
