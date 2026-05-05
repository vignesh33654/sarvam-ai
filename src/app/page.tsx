import { Sidebar } from "@/components/layout/Sidebar"
import { TopBar } from "@/components/layout/TopBar"
import { TextToSpeechApp } from "@/apps/text-to-speech"
import { L2Panel } from "@/apps/text-to-speech/components/L2Panel"

export default function Home() {
  return (
    <div className="flex h-screen bg-white text-[var(--color-text-primary)]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar
          title="Text to Speech"
          subtitle="Convert text to natural speech in Indian languages"
        />
        <main className="flex flex-1 overflow-hidden min-h-0">
          <div className="flex-1 overflow-auto">
            <TextToSpeechApp />
          </div>
          <L2Panel />
        </main>
      </div>
    </div>
  )
}
