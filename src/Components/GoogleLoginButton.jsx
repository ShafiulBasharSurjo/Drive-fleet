"use client";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function GoogleBtn({ onSuccess }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return (
      <p className="text-xs text-center text-base-content/50">
        Set NEXT_PUBLIC_GOOGLE_CLIENT_ID to enable Google login
      </p>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => toast.error("Google sign-in was cancelled or failed")}
          theme="filled_black"
          shape="pill"
          text="continue_with"
          width="280"
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default function GoogleLoginButton() {
  const { googleLogin } = useAuth();
  const router = useRouter();

  const handleSuccess = async (response) => {
    try {
      await googleLogin(response.credential);
      toast.success("Signed in with Google");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  return <GoogleBtn onSuccess={handleSuccess} />;
}
