import type { Metadata } from "next";
import { Card, CardContent } from "@/components/shared/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shared/avatar";
import { Badge } from "@/components/shared/badge";
import { getAgents } from "@/lib/db/queries";

export const metadata: Metadata = { title: "Agen" };

export default async function AdminAgentsPage() {
  const agents = await getAgents();

  return (
    <div className="space-y-6">
      <h1 className="text-foreground text-2xl font-bold">Agen Properti</h1>
      {agents.length === 0 ? (
        <Card>
          <CardContent className="text-muted-foreground py-12 text-center">
            Belum ada agen yang ditugaskan pada properti.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={agent.image ?? undefined}
                    alt={agent.name}
                  />
                  <AvatarFallback>
                    {(agent.name || "A").slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-foreground truncate font-semibold">
                    {agent.name}
                  </p>
                  <p className="text-muted-foreground truncate text-sm">
                    {agent.email}
                  </p>
                  {agent.phone && (
                    <Badge variant="outline" className="mt-1">
                      {agent.phone}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
