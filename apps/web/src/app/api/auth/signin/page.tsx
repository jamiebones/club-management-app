"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "@/app/components/Loading";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, []);

  const handleSubmit = async () => {
    if (!email && !password) return;
    setLoading(true);
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      //callbackUrl: '/dashboard'
    });

    if (res?.status == 200) {
      router.push("/dashboard");
      setLoading(false);
    } else {
      // setError(res?.error);
      toast.error(res?.error, {
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In To Bar Management</h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <form className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            {/* Password Input */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your password"
              />
            </div>
            {/* Sign In Button */}
            <div>
              <button
                disabled={loading}
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200">
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
