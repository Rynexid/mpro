import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";

export const metadata: Metadata = {
  title: "Media Library",
};

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-foreground text-2xl font-bold">Media Library</h1>
      <Card>
        <CardHeader>
          <CardTitle>File & Gambar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Media library akan diintegrasikan dengan Cloudflare R2.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
