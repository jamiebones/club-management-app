"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import LoadingSpinner from "../components/Loading";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { data: session } = useSession();

  // Mock authentication check

  useEffect(() => {
    const redirectUserBasedOnRole = () => {
      if (session && session?.user?.role! == "ADMIN") {
        //redirect to a page
        router.push("/dashboard/query/member/search");
      }
    };
    if (session ) {
      redirectUserBasedOnRole();
    } else{
        router.push("/api/auth/signin")
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
}
