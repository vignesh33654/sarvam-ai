"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AudioWave01Icon,
  FavouriteIcon,
  Clock01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"

type Tab = "voice" | "favourites" | "history" | "settings"

const TABS: { id: Tab; icon: typeof AudioWave01Icon; label: string }[] = [
  { id: "voice",      icon: AudioWave01Icon,      label: "Voice" },
  { id: "favourites", icon: FavouriteIcon,  label: "Favourites" },
  { id: "history",    icon: Clock01Icon,    label: "History" },
  { id: "settings",   icon: Settings01Icon, label: "Settings" },
]

export function L2Panel() {
  const [active, setActive] = useState<Tab>("voice")

  return (
    <div className="flex flex-col gap-3 items-start p-3 border-l border-[var(--color-divider)] bg-white shrink-0 h-full">
      {TABS.map(({ id, icon, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            aria-label={label}
            title={label}
            className={[
              "flex items-center justify-center size-10 rounded-full transition-colors",
              isActive
                ? "bg-[var(--color-divider)]"
                : "hover:bg-[var(--color-2)]",
            ].join(" ")}
          >
            <HugeiconsIcon
              icon={icon}
              size={24}
              color={isActive ? "var(--color-text-primary)" : "var(--color-text-tertiary)"}
            />
          </button>
        )
      })}
    </div>
  )
}
