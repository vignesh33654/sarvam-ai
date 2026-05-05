import { SidebarNav } from "@/components/layout/sidebar-nav";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white text-[#141414]">
      <SidebarNav />
      <main className="flex flex-1 items-center justify-center p-10 text-[#666666]">
        Content area
      </main>
    </div>
  );
}
