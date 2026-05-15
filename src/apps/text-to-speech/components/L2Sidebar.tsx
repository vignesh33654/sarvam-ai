"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { AudioWave01Icon, FavouriteIcon, Clock02Icon, Settings01Icon } from "@hugeicons/core-free-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { L2Tab } from "./L2Tabs"

const TABS: { id: L2Tab; icon: typeof AudioWave01Icon; label: string }[] = [
  { id: "voice",      icon: AudioWave01Icon, label: "Voice" },
  { id: "favourites", icon: FavouriteIcon,  label: "Favourites" },
  { id: "history",    icon: Clock02Icon,     label: "History" },
  { id: "settings",   icon: Settings01Icon,  label: "Settings" },
]

export function L2Sidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: L2Tab
  onTabChange: (tab: L2Tab) => void
}) {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-col items-center gap-2 px-2 pt-3 w-[56px] border-l border-[var(--color-divider)] bg-[#fafafa]">
        {TABS.map((tab) => (
          <Tooltip key={tab.id}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={[
                  "size-9 rounded-full flex items-center justify-center transition-colors",
                  activeTab === tab.id
                    ? "bg-[#e8e8e8] text-[var(--color-text-primary)] border border-[#d4d4d4]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-2)] border border-transparent",
                ].join(" ")}
                aria-label={tab.label}
                aria-pressed={activeTab === tab.id}
              >
                <HugeiconsIcon icon={tab.icon} size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">{tab.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

