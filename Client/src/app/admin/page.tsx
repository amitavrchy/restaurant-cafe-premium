import type { Metadata } from "next";
import { AdminBoard } from "@/components/admin/AdminBoard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="container-wide section-pad">
      <AdminBoard />
    </div>
  );
}
