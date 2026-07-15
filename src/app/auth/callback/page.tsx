"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AuthCallbackPage() {
  const router = useRouter();

  React.useEffect(() => {
    authClient.getSession().then((res: { data?: { user?: Record<string, unknown> } | null } | null) => {
      const username = res?.data?.user?.username;
      router.replace(username ? `/${username}` : "/");
    });
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
        <span className="bg-primary/60 h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:150ms]" />
        <span className="bg-primary/30 h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:300ms]" />
      </div>
    </div>
  );
}
