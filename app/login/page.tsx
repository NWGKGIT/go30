"use client";

import { useState } from "react";
import { signIn, signUp } from "@/app/actions/auth";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    if (mode === "signin") {
      const result = await signIn(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } else {
      const result = await signUp(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else if (result?.success) {
        setSuccess(result.success);
        setMode("signin");
        setLoading(false);
      }
      // If no result, redirect happened server-side
    }
  }

  function switchMode() {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    setError(null);
    setSuccess(null);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-in">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-blue rounded-xl mb-4">
            <span className="text-white font-black text-xl">g</span>
          </div>
          <h1 className="text-2xl font-black text-text-primary tracking-tight">
            go30
          </h1>
          <p className="text-text-muted text-sm mt-1">30-Day Go Learning Tracker</p>
        </div>

        {/* Card */}
        <div className="card p-6">
          {/* Mode tabs */}
          <div className="flex rounded-lg bg-surface-raised p-1 mb-5">
            <button
              type="button"
              onClick={() => { setMode("signin"); setError(null); setSuccess(null); }}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                mode === "signin"
                  ? "bg-surface text-text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setError(null); setSuccess(null); }}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                mode === "signup"
                  ? "bg-surface text-text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-text-secondary mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input-base"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-text-secondary mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                minLength={mode === "signup" ? 6 : undefined}
                className="input-base"
                placeholder="••••••••"
              />
              {mode === "signup" && (
                <p className="text-text-muted text-2xs mt-1">
                  Minimum 6 characters
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 text-accent-coral text-xs bg-accent-coral-dim border border-accent-coral/20 rounded-lg px-3 py-2">
                <span className="material-symbols-outlined text-[14px] flex-shrink-0 mt-0.5">
                  error
                </span>
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-start gap-2 text-accent-green text-xs bg-accent-green-dim border border-accent-green/20 rounded-lg px-3 py-2">
                <span className="material-symbols-outlined text-[14px] flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center flex items-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">
                    progress_activity
                  </span>
                  {mode === "signin" ? "Signing in…" : "Creating account…"}
                </>
              ) : mode === "signin" ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-text-muted text-xs mt-4">
          Track your 30-day Go programming journey
        </p>
      </div>
    </div>
  );
}
