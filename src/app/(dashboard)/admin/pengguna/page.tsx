import type { Metadata } from "next";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { UserRoleSelect } from "@/components/admin/user-role-select";
import { DeleteButton } from "@/components/admin/delete-button";
import { getUsers } from "@/lib/db/queries";
import { deleteUser } from "@/lib/actions";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Pengguna" };

const roleLabels: Record<string, string> = {
  user: "Pengguna",
  admin: "Admin",
  sudo: "Super Admin",
};

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-foreground text-2xl font-bold">Pengguna</h1>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b text-left">
                  <th className="p-4 font-medium">Nama</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Telepon</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Bergabung</th>
                  <th className="p-4 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b last:border-0">
                    <td className="text-foreground p-4 font-medium">
                      {u.name}
                    </td>
                    <td className="text-muted-foreground p-4">{u.email}</td>
                    <td className="text-muted-foreground p-4">
                      {u.phone ?? "-"}
                    </td>
                    <td className="p-4">
                      <UserRoleSelect userId={u.id} role={u.role} />
                    </td>
                    <td className="text-muted-foreground p-4">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="p-4 text-right">
                      <DeleteButton
                        action={async () => deleteUser(u.id)}
                        label="Hapus"
                      />
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-muted-foreground p-8 text-center"
                    >
                      Belum ada pengguna.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
