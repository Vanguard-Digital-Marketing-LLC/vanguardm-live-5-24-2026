"use client";

import { useState } from "react";
import { User, Lock, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  user: { name: string; email: string; role: string };
}

export default function AdminSettingsClient({ user }: Props) {
  const [name, setName] = useState(user.name);
  const [savingName, setSavingName] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPw, setChangingPw] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  async function handleNameSave(e: React.FormEvent) {
    e.preventDefault();
    setNameError(null);
    setNameSuccess(false);
    if (!name.trim()) { setNameError("Name is required"); return; }

    setSavingName(true);
    try {
      const res = await fetch("/api/admin/settings/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update profile");
      }
      setNameSuccess(true);
    } catch (err) {
      setNameError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSavingName(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);

    if (!currentPassword || !newPassword) { setPwError("Both passwords are required"); return; }
    if (newPassword.length < 8) { setPwError("New password must be at least 8 characters"); return; }
    if (newPassword !== confirmPassword) { setPwError("Passwords do not match"); return; }

    setChangingPw(true);
    try {
      const res = await fetch("/api/admin/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to change password");
      }
      setPwSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPwError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setChangingPw(false);
    }
  }

  const inputClass = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/50 transition-colors";

  return (
    <>
      {/* Profile Section */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <h2 className="font-display text-base font-semibold text-white">Profile</h2>
          <p className="text-sm text-slate-400 mt-1">Your account information</p>
        </div>
        <form onSubmit={handleNameSave} className="lg:col-span-8 bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          {nameError && (
            <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-sm text-red-400">{nameError}</div>
          )}
          {nameSuccess && (
            <div className="p-3 rounded-lg bg-emerald/10 border border-emerald/20 text-sm text-emerald flex items-center gap-2">
              <CheckCircle2 size={16} /> Name updated
            </div>
          )}
          <div>
            <label htmlFor="settings-name" className="text-xs text-slate-400 block mb-1">Name</label>
            <input id="settings-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} disabled={savingName} />
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-1">Email</span>
            <p className="text-sm text-white bg-white/5 rounded-lg px-4 py-2.5 border border-white/5">{user.email}</p>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-1">Role</span>
            <p className="text-sm text-white bg-white/5 rounded-lg px-4 py-2.5 border border-white/5">{user.role}</p>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={savingName} className="inline-flex items-center gap-2 px-5 py-2 bg-emerald text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50">
              {savingName ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : "Save Name"}
            </button>
          </div>
        </form>
      </div>

      {/* Password Section */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-amber" />
            <h2 className="font-display text-base font-semibold text-white">Password</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">Change your account password</p>
        </div>
        <form onSubmit={handlePasswordChange} className="lg:col-span-8 bg-[#111827] border border-white/6 rounded-xl p-6 space-y-4">
          {pwError && (
            <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-sm text-red-400">{pwError}</div>
          )}
          {pwSuccess && (
            <div className="p-3 rounded-lg bg-emerald/10 border border-emerald/20 text-sm text-emerald flex items-center gap-2">
              <CheckCircle2 size={16} /> Password changed successfully
            </div>
          )}
          <div>
            <label htmlFor="settings-current-password" className="block text-sm font-medium text-slate-300 mb-1">Current Password</label>
            <input id="settings-current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={inputClass} placeholder="Enter current password" required disabled={changingPw} />
          </div>
          <div>
            <label htmlFor="settings-new-password" className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
            <input id="settings-new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} placeholder="At least 8 characters" required minLength={8} disabled={changingPw} />
          </div>
          <div>
            <label htmlFor="settings-confirm-password" className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
            <input id="settings-confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} placeholder="Re-enter new password" required disabled={changingPw} />
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={changingPw} className="inline-flex items-center gap-2 px-5 py-2 bg-emerald text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50">
              {changingPw ? <><Loader2 size={16} className="animate-spin" /> Changing...</> : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
