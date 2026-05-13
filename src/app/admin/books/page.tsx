import ContentManager from "@/components/admin/content-manager";
import AdminShell from "@/components/admin/admin-shell";
import { Suspense } from "react";

export default function AdminBooksPage() {
  return (
    <AdminShell>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading books...</p>}>
        <ContentManager section="books" />
      </Suspense>
    </AdminShell>
  );
}
