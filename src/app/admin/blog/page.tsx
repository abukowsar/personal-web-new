import ContentManager from "@/components/admin/content-manager";
import AdminShell from "@/components/admin/admin-shell";
import { Suspense } from "react";

export default function AdminBlogPage() {
  return (
    <AdminShell>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading blog...</p>}>
        <ContentManager section="blog" />
      </Suspense>
    </AdminShell>
  );
}
