import { Users, Shield, User as UserIcon } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function UsersAdminPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <Users className="h-8 w-8 text-indigo-600" />
            User Management
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Manage roles, view active users, and handle access requests.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <UserIcon className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="font-bold text-slate-900 text-base">{user.name || "Unknown"}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-700 font-medium">{user.email || "No email"}</span>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? (
                      <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none font-bold gap-1">
                        <Shield className="h-3 w-3" />
                        {user.role}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold">
                        {user.role}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
