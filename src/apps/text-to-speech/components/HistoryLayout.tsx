"use client"

import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  MoreVerticalIcon,
  ArchiveRestoreIcon,
  Download01Icon,
  Copy01Icon,
} from "@hugeicons/core-free-icons"

type HistoryEntry = {
  id: string
  language: string
  voiceName: string
  avatarSrc: string
  avatarBg: string
  text: string
}

type DateGroup = {
  label: string
  entries: HistoryEntry[]
}

const HISTORY_DATA: DateGroup[] = [
  {
    label: "Today",
    entries: [
      {
        id: "1",
        language: "Hindi",
        voiceName: "Riya",
        avatarSrc: "/Avatar/Type=2.png",
        avatarBg: "#dad4ff",
        text: "नमस्ते! Sarvam AI में आपका स्वागत है हम भारतीय भाषाओं के लिए अत्याधुनिक voice technology बनाते है हमारे text-to-speech...नमस्ते! Sarvam AI में आपका स्वागत है हम भारतीय भाषाओं के लिए अत्याधुनिक voice technology बनाते है हमारे text-to",
      },
      {
        id: "2",
        language: "English",
        voiceName: "Riya",
        avatarSrc: "/Avatar/Type=4.png",
        avatarBg: "#fff0ba",
        text: "Welcome to Sarvam AI, where we create advanced voice technology tailored for Indian languages",
      },
      {
        id: "3",
        language: "Tamil",
        voiceName: "Riya",
        avatarSrc: "/Avatar/Type=6.png",
        avatarBg: "#fed9db",
        text: "நாங்கள் இந்திய மொழிகளுக்கான முன்னேற்றமான குரல் தொழில்நுட்பத்தை உருவாக்குகிறோம். எங்கள் உரை-மாற்று குரல் மாதிரிகள் இயற்கையான மற்றும் மனிதர்களைப் .",
      },
      {
        id: "4",
        language: "Marathi",
        voiceName: "Riya",
        avatarSrc: "/Avatar/Type=7.png",
        avatarBg: "#eaf4ff",
        text: "Sarvam AI चे Saaras मॉडेल मराठी ऑडिओसाठी खास तयार केले आहे. हे मॉडेल मराठी आणि इंग्रजी मिश्रित बोलणे (Code-Switching) अचूकपणे ओळखते",
      },
      {
        id: "5",
        language: "Telugu",
        voiceName: "Riya",
        avatarSrc: "/Avatar/Type=2.png",
        avatarBg: "#dad4ff",
        text: "Sarvam AI ఒక భారతీయ కృత్రిమ మేధస్సు కంపెనీ, బెంగళూరులో ముఖ్యాలయంతో 2023లో స్థాపించబడింది. ఇది భారతీయ భాషలపై దృష్టి సారించిన LLMs మరియు multimodal AI వ్యవస్థలను అభివృద్ధి చేస్తుంది.",
      },
      {
        id: "6",
        language: "Hindi",
        voiceName: "Riya",
        avatarSrc: "/Avatar/Type=2.png",
        avatarBg: "#dad4ff",
        text: "नमस्ते! Sarvam AI में आपका स्वागत है हम भारतीय भाषाओं के लिए अत्याधुनिक voice technology बनाते है हमारे text-to-speech...नमस्ते! Sarvam AI में आपका स्वागत है हम भारतीय भाषाओं के लिए अत्याधुनिक voice technology बनाते है हमारे text-to",
      },
      {
        id: "7",
        language: "Hindi",
        voiceName: "Riya",
        avatarSrc: "/Avatar/Type=2.png",
        avatarBg: "#dad4ff",
        text: "नमस्ते! Sarvam AI में आपका स्वागत है हम भारतीय भाषाओं के लिए अत्याधुनिक voice technology बनाते है हमारे text-to-speech...नमस्ते! Sarvam AI में आपका स्वागत है हम भारतीय भाषाओं के लिए अत्याधुनिक voice technology बनाते है हमारे text-to",
      },
    ],
  },
]

const MENU_ACTIONS = [
  { label: "Restore", icon: ArchiveRestoreIcon },
  { label: "Download", icon: Download01Icon },
  { label: "Copy", icon: Copy01Icon },
]

function FilterChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 bg-white border border-[var(--color-divider)] rounded-full px-3 py-2 whitespace-nowrap"
    >
      <span className="text-[14px] leading-5 text-[var(--color-text-primary)]">{label}</span>
      <HugeiconsIcon icon={ArrowDown01Icon} size={16} className="text-[var(--color-text-primary)] shrink-0" />
    </button>
  )
}

function HistoryItem({ entry }: { entry: HistoryEntry }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  return (
    <div className="flex flex-col gap-2 px-4 py-3 bg-white">
      <div className="flex items-center gap-2">
        {/* Play button */}
        <button
          type="button"
          className="flex items-center justify-center size-8 rounded-full border border-[var(--color-divider)] shrink-0 hover:bg-[var(--color-2)] transition-colors"
          aria-label="Play"
        >
          <img src="/Play.svg" alt="" aria-hidden className="size-[14px] object-contain" />
        </button>

        {/* Language → Voice */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-[14px] leading-5 text-[var(--color-text-primary)] whitespace-nowrap">
            {entry.language}
          </span>
          <span className="text-[14px] leading-5 text-[var(--color-text-tertiary)]">→</span>
          <div className="flex items-center gap-1">
            <div
              className="size-5 rounded-full overflow-hidden shrink-0"
              style={{ backgroundColor: entry.avatarBg }}
            >
              <img
                src={entry.avatarSrc}
                alt={entry.voiceName}
                className="size-full object-cover"
              />
            </div>
            <span className="text-[14px] leading-5 text-[var(--color-text-primary)] whitespace-nowrap">
              {entry.voiceName}
            </span>
          </div>
        </div>

        {/* More menu */}
        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center justify-center size-8 rounded-full hover:bg-[var(--color-2)] transition-colors"
            aria-label="More options"
          >
            <HugeiconsIcon icon={MoreVerticalIcon} size={16} className="text-[var(--color-text-primary)]" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-[var(--color-divider)] rounded-xl shadow-md z-20 py-1 min-w-[148px]">
              {MENU_ACTIONS.map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-[var(--color-2)] transition-colors"
                >
                  <HugeiconsIcon icon={icon} size={16} className="text-[var(--color-text-secondary)] shrink-0" />
                  <span className="text-[14px] leading-5 text-[var(--color-text-primary)]">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview text */}
      <p className="text-[14px] leading-5 text-[var(--color-text-tertiary)] line-clamp-2">
        {entry.text}
      </p>
    </div>
  )
}

export function HistoryLayout() {
  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-5 py-4 shrink-0">
        <p className="text-body-14 text-[var(--color-text-primary)]">History</p>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="flex items-center gap-1 px-4 pb-2">
          <FilterChip label="Voice" />
          <FilterChip label="Language" />
          <FilterChip label="Date" />
        </div>

        {/* Date groups */}
        {HISTORY_DATA.map((group) => (
          <div key={group.label} className="flex flex-col">
            {/* Date label */}
            <div className="flex items-center justify-center py-2">
              <div className="bg-[#f5f5f5] rounded-[30px] px-3 py-[6px]">
                <span className="text-[12px] leading-4 font-medium text-[#666] tracking-[0.2px]">
                  {group.label}
                </span>
              </div>
            </div>

            {/* Items */}
            {group.entries.map((entry) => (
              <HistoryItem key={entry.id} entry={entry} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
