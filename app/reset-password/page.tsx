"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to reset password");

      setMessage(data.message || "Password reset successful.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">{error}</div>}
      {message && <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">{message}</div>}

      <div className="space-y-2">
        <label htmlFor="password" className="text-[10px] font-black text-slate-300 uppercase tracking-widest block pl-1">New Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/5 border-white/10 focus:border-accent text-white placeholder-slate-500 pl-10 rounded-xl h-11" required />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-[10px] font-black text-slate-300 uppercase tracking-widest block pl-1">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white/5 border-white/10 focus:border-accent text-white placeholder-slate-500 pl-10 rounded-xl h-11" required />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full rounded-2xl py-6 font-bold bg-primary border border-white/10 hover:bg-slate-900 text-white shadow-xl transition-all">
        {isLoading ? <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : "Set New Password"}
      </Button>
      
      <div className="text-center mt-4">
        <Link href="/login" className="text-[11px] font-semibold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Back to Sign In
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center bg-slate-950 relative overflow-hidden py-12 px-4">
      <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(18,52,77,0.4),transparent)] pointer-events-none" />

      <Card className="w-full max-w-md bg-white/[0.03] border-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-2xl relative z-10 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent via-secondary to-indigo-500" />
        <CardContent className="p-8 md:p-10 space-y-8">
          
          <div className="text-center space-y-3.5">
            <h1 className="font-heading text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
              Set New Password
              <Sparkles className="h-4 w-4 text-secondary fill-current" />
            </h1>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Enter your new secure password below
            </p>
          </div>

          <Suspense fallback={<div className="h-20 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>}>
            <ResetPasswordForm />
          </Suspense>

          <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest border-t border-white/5 pt-6">
            <ShieldCheck className="h-4 w-4 text-accent" />
            AES-256 secure storage
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
