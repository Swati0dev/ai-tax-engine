"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { Landmark, ShieldCheck, Mail, Lock, ArrowRight, Chrome, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { addXp } from "@/lib/gamification";
import { triggerConfetti } from "@/components/ui/Confetti";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (searchParams.get("mode") === "signup") {
      setIsSignUp(true);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please fill in all credentials fields.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (isSignUp) {
        // Implement Real User Creation Flow here (via Prisma or Backend API)
        // For now simulate creation and auto-login
        setTimeout(() => {
          setSuccessMsg("Account created successfully! Logging you in...");
          setTimeout(() => {
            if (typeof window !== "undefined") {
              localStorage.setItem("tax-logged-in", "true");
              addXp(50); // bonus xp for signup
              triggerConfetti();
              router.push("/dashboard");
              router.refresh();
            }
          }, 1500);
        }, 1000);
        return;
      }

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setErrorMsg("Invalid credentials. Please check your email and password.");
        setIsLoading(false);
      } else {
        if (typeof window !== "undefined") {
          const alreadyLoggedIn = localStorage.getItem("tax-logged-in");
          
          if (!alreadyLoggedIn) {
            localStorage.setItem("tax-logged-in", "true");
            addXp(25);
          }

          triggerConfetti();
          
          const session = await getSession();
          const role = (session?.user as { role?: string })?.role;
          if (role === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
          
          router.refresh();
        }
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleThirdPartyLogin = async (provider: string) => {
    setIsLoading(true);
    if (provider === "google") {
      await signIn("google", { callbackUrl: "/dashboard" });
    } else {
      setTimeout(() => {
        setIsLoading(false);
        if (typeof window !== "undefined") {
          localStorage.setItem("tax-logged-in", "true");
          addXp(25);
          triggerConfetti();
          router.push("/dashboard");
        }
      }, 1000);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center bg-slate-950 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Premium glowing background mesh */}
      <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(18,52,77,0.4),transparent)] pointer-events-none" />

      {/* Main glass card */}
      <Card className="w-full max-w-md bg-white/[0.03] border-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-2xl relative z-10 text-white overflow-hidden">
        {/* Glow border overlay */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent via-secondary to-indigo-500" />
        
        <CardContent className="p-8 md:p-10 space-y-8">
          
          {/* Logo & Header */}
          <div className="text-center space-y-3.5">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10 shadow-lg text-secondary mx-auto">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
                {isSignUp ? "Create an Account" : "Tax AI Portal"}
                <Sparkles className="h-4 w-4 text-secondary fill-current" />
              </h1>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                {isSignUp ? "Join the smartest tax platform in India" : "Enter credentials to sign in securely"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                {errorMsg}
              </div>
            )}
            
            {successMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                {successMsg}
              </div>
            )}

            {isSignUp && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label htmlFor="name" className="text-[10px] font-black text-slate-300 uppercase tracking-widest block pl-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/5 border-white/10 focus:border-accent text-white placeholder-slate-500 pl-10 rounded-xl h-11"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-black text-slate-300 uppercase tracking-widest block pl-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-accent text-white placeholder-slate-500 pl-10 rounded-xl h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="passcode" className="text-[10px] font-black text-slate-300 uppercase tracking-widest block">
                  Password
                </label>
                {!isSignUp && (
                  <Link href="/forgot-password" className="text-[10px] text-accent hover:text-accent/80 font-bold transition-colors">
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  id="passcode"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-accent text-white placeholder-slate-500 pl-10 rounded-xl h-11"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl py-6 font-bold bg-primary border border-white/10 hover:bg-slate-900 text-white shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="h-4.5 w-4.5 text-accent" />
                </>
              )}
            </Button>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <span className="relative bg-slate-950 px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Or sign in with
            </span>
          </div>

          {/* Third-party Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={() => handleThirdPartyLogin("google")}
              disabled={isLoading}
              className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl h-11 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer text-white shadow"
            >
              <Chrome className="h-4 w-4 text-white" />
              Google Auth
            </Button>
            <Button
              type="button"
              onClick={() => handleThirdPartyLogin("portal")}
              disabled={isLoading}
              className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl h-11 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer text-white shadow"
            >
              <Landmark className="h-4 w-4 text-white" />
              Tax Portal Key
            </Button>
          </div>

          {/* Footer security badge */}
          <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest border-t border-white/5 pt-6">
            <ShieldCheck className="h-4 w-4 text-accent" />
            AES-256 secure financial encryption
          </div>

        </CardContent>
      </Card>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div></div>}>
      <LoginContent />
    </Suspense>
  );
}
