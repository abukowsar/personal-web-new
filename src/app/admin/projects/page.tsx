import ContentManager from "@/components/admin/content-manager";
import AdminShell from "@/components/admin/admin-shell";
import { Suspense } from "react";

export default function AdminProjectsPage() {
  return (
    <AdminShell>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading projects...</p>}>
        <ContentManager section="projects" />
      </Suspense>
    </AdminShell>
  );
}
