"use client"

import { useState } from "react"
import { L2Sidebar } from "./L2Sidebar"
import { SpeechLayout } from "./SpeechLayout"
import type { L2Tab } from "./L2Tabs"

export function L2Panel() {
  const [activeTab, setActiveTab] = useState<L2Tab>("voice")

  return (
    <div className="flex w-[560px] shrink-0 border-l border-[var(--color-divider)] bg-white h-full overflow-hidden">
      <SpeechLayout activeTab={activeTab} />
      <L2Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
