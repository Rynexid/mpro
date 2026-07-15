"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import { updateUserRole } from "@/lib/actions";

export function UserRoleSelect({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  return (
    <Select
      defaultValue={role}
      disabled={pending}
      onValueChange={(value) => {
        startTransition(async () => {
          await updateUserRole(userId, value as "user" | "admin" | "sudo");
          router.refresh();
        });
      }}
    >
      <SelectTrigger className="h-8 w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="user">Pengguna</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="sudo">Sudo</SelectItem>
      </SelectContent>
    </Select>
  );
}
