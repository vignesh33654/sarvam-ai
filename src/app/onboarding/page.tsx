import { Sidebar } from "@/components/layout/Sidebar"
import { TopBar } from "@/components/layout/TopBar"
import { FirstTimeScreen } from "@/apps/text-to-speech/components/FirstTimeScreen"

export default function OnboardingPage() {
  return (
    <div className="flex h-screen bg-white text-[var(--color-text-primary)]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar
          title="Text to Speech"
          subtitle="Convert text to natural speech in Indian languages"
          credits={17}
        />
        <main className="flex flex-1 overflow-hidden min-h-0">
          <div className="flex-1 min-w-0 overflow-auto">
            <FirstTimeScreen />
          </div>
        </main>
      </div>
    </div>
  )
}
