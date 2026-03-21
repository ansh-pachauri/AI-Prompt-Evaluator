import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardClient from "@/components/DashboardClient";
import { createClient } from "@/src/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Header userEmail={user?.email ?? undefined} />
      <DashboardClient />
      <Footer />
    </div>
  );
}
