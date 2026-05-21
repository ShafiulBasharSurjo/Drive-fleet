"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import GoogleLoginButton from "@/Components/GoogleLoginButton";

function validatePassword(password) {
  const errors = [];
  if (!password || password.length < 6) {
    errors.push("At least 6 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("One uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("One lowercase letter");
  }
  return errors;
}

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [pwdErrors, setPwdErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const password = form.get("password");
    const errors = validatePassword(password);
    setPwdErrors(errors);
    if (errors.length) return;

    setPending(true);
    try {
      await register({
        name: form.get("name"),
        email: form.get("email"),
        photoURL: form.get("photoURL"),
        password,
      });
      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl border border-base-200 p-8">
        <h1 className="text-2xl font-bold text-center mb-1">Registration</h1>
        <p className="text-sm text-center text-base-content/50 mb-6">
          Join DriveFleet to rent or list premium vehicles
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-sm font-medium">Name</label>
            <input
              name="name"
              required
              className="input input-bordered w-full rounded-xl"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="label text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="input input-bordered w-full rounded-xl"
            />
          </div>
          <div>
            <label className="label text-sm font-medium">Photo URL</label>
            <input
              name="photoURL"
              type="url"
              className="input input-bordered w-full rounded-xl"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="label text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              className="input input-bordered w-full rounded-xl"
              onChange={(e) => setPwdErrors(validatePassword(e.target.value))}
            />
            {pwdErrors.length > 0 && (
              <ul className="text-xs text-error mt-2 list-disc list-inside">
                {pwdErrors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            disabled={pending || pwdErrors.length > 0}
            className="btn btn-primary w-full rounded-xl font-semibold"
          >
            {pending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="divider text-xs my-6">OR</div>
        <GoogleLoginButton />

        <p className="text-center text-sm mt-6 text-base-content/60">
          Already have an account?{" "}
          <Link href="/login" className="link link-primary font-medium">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
