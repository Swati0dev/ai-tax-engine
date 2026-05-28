"use client";

import { useState } from "react";
import { User, Mail, Phone, Briefcase, MapPin, Building, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "Pearl",
    email: "pearl@example.com",
    phone: "+91 9876543210",
    pan: "ABCDE1234F",
    occupation: "salaried",
    businessType: "",
    state: "Maharashtra",
    incomeRange: "10-20L",
    gstRegistered: "no"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add toast or API call here
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Profile</h1>
        <p className="text-sm text-muted-foreground font-medium mt-1">
          Manage your personal information and tax profile details to help AI personalize your dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Personal Info */}
        <div className="md:col-span-2 space-y-6">
          <Card className="rounded-[2rem] border-primary/10 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Personal Details</h3>
                    <p className="text-xs text-muted-foreground">Basic identification and contact info</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl font-bold"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  {isEditing ? (
                    <input name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none" />
                  ) : (
                    <div className="font-semibold text-slate-800">{formData.name}</div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="h-3 w-3" /> Email
                  </label>
                  {isEditing ? (
                    <input name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none" />
                  ) : (
                    <div className="font-semibold text-slate-800">{formData.email}</div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="h-3 w-3" /> Phone Number
                  </label>
                  {isEditing ? (
                    <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none" />
                  ) : (
                    <div className="font-semibold text-slate-800">{formData.phone}</div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3" /> PAN Number
                  </label>
                  {isEditing ? (
                    <input name="pan" value={formData.pan} onChange={handleInputChange} className="w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none uppercase font-mono" />
                  ) : (
                    <div className="font-semibold text-slate-800 font-mono tracking-widest">{formData.pan.replace(/.(?=.{4})/g, '*')}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card className="rounded-[2rem] border-primary/10 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Professional & Tax Details</h3>
                  <p className="text-xs text-muted-foreground">Used by AI to find applicable deductions</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Occupation Type</label>
                  {isEditing ? (
                    <select name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full p-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                      <option value="salaried">Salaried</option>
                      <option value="business">Business Owner</option>
                      <option value="freelancer">Freelancer / Professional</option>
                    </select>
                  ) : (
                    <div className="font-semibold text-slate-800 capitalize">{formData.occupation}</div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Annual Income Range</label>
                  {isEditing ? (
                    <select name="incomeRange" value={formData.incomeRange} onChange={handleInputChange} className="w-full p-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                      <option value="0-5L">Up to 5 Lakhs</option>
                      <option value="5-10L">5 - 10 Lakhs</option>
                      <option value="10-20L">10 - 20 Lakhs</option>
                      <option value="20L+">Above 20 Lakhs</option>
                    </select>
                  ) : (
                    <div className="font-semibold text-slate-800">{formData.incomeRange}</div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="h-3 w-3" /> GST Registration
                  </label>
                  {isEditing ? (
                    <select name="gstRegistered" value={formData.gstRegistered} onChange={handleInputChange} className="w-full p-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-primary/20 outline-none">
                      <option value="yes">Yes, Registered</option>
                      <option value="no">Not Registered</option>
                    </select>
                  ) : (
                    <div className="font-semibold text-slate-800 capitalize">{formData.gstRegistered === 'yes' ? 'Registered' : 'Not Registered'}</div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> State
                  </label>
                  {isEditing ? (
                    <input name="state" value={formData.state} onChange={handleInputChange} className="w-full p-2.5 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none" />
                  ) : (
                    <div className="font-semibold text-slate-800">{formData.state}</div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSave} className="rounded-xl px-6 bg-primary font-bold text-white hover:opacity-90 transition-opacity">
                    Save Profile Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Profile Status */}
        <div className="space-y-6">
          <Card className="rounded-[2rem] bg-gradient-to-br from-indigo-500/5 to-purple-500/10 border-primary/10 overflow-hidden relative shadow-sm">
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <CardContent className="p-6 relative z-10 space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-black mb-4">
                  {formData.name.charAt(0)}
                </div>
                <h3 className="text-xl font-extrabold">{formData.name}</h3>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                  <CheckCircle2 className="h-3 w-3" /> Profile Verified
                </span>
              </div>

              <div className="pt-4 border-t border-primary/10 space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">AI Personalization</span>
                  <span className="text-primary">85% Complete</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%] rounded-full" />
                </div>
                <p className="text-[10px] text-muted-foreground text-center">
                  Complete your professional details to get 100% accurate AI tax suggestions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
