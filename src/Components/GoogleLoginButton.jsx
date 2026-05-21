"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function GoogleLoginButton() {
  const { googleLogin } = useAuth();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return (
      <p className="text-xs text-center text-base-content/50">
        Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to .env.local to enable Google login
      </p>
    );
  }

  const handleSuccess = async (response) => {
    if (!response?.credential) {
      toast.error("Google sign-in did not return a credential");
      return;
    }

    setPending(true);
    try {
      await googleLogin(response.credential);
      toast.success("Signed in with Google");
      router.replace("/");
    } catch (err) {
      toast.error(err.message || "Google login failed");
    } finally {
      setPending(false);
    }
  };

  if (pending) {
    return (
      <div className="flex justify-center py-2">
        <span className="loading loading-spinner loading-md text-primary" />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() =>
          toast.error(
            "Google sign-in blocked. In Google Cloud Console, add your site URL under OAuth client → Authorized JavaScript origins (e.g. http://localhost:3000).",
            { autoClose: 8000 },
          )
        }
        theme="filled_black"
        shape="pill"
        text="continue_with"
        width="280"
      />
    </div>
  );
}
