"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import GoogleLoginButton from "@/Components/GoogleLoginButton";

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  if (!loading && user) {
    router.replace("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(e.target);
    try {
      await login(form.get("email"), form.get("password"));
      toast.success("Welcome back to DriveFleet!");
      router.push("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl border border-base-200 p-8">
        <h1 className="text-2xl font-bold text-center mb-1">Login</h1>
        <p className="text-sm text-center text-base-content/50 mb-6">
          Sign in to manage bookings and list your vehicles
        </p>

        {error && (
          <div className="alert alert-error text-sm mb-3.5 py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="input input-bordered w-full rounded-xl"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="label text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              className="input input-bordered w-full rounded-xl text-amber-400"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="btn btn-primary w-full rounded-xl font-semibold"
          >
            {pending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="divider text-xs my-6">OR</div>
        <GoogleLoginButton />

        <p className="text-center text-sm mt-6 text-base-content/60">
          New here?{" "}
          <Link href="/register" className="link link-primary font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
