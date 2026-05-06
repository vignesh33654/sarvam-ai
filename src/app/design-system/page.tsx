import { Sidebar } from "@/components/layout/Sidebar"
import { TopBar } from "@/components/layout/TopBar"
import { DropdownPlayground } from "@/apps/design-system/DropdownPlayground"

export default function DesignSystemPage() {
  return (
    <div className="flex h-screen bg-white text-[var(--color-text-primary)]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar title="Design System" subtitle="Component playground" />
        <main className="flex-1 overflow-auto p-10">
          <div className="max-w-3xl mx-auto">
            <DropdownPlayground />
          </div>
        </main>
      </div>
    </div>
  )
}
