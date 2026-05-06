"use client"

import { Search } from "@/components/ui/Search"
import { Dropdown, type DropdownOption } from "@/components/ui/Dropdown"
import { SpeechCard } from "./SpeechCard"
import { FavouritesLayout } from "./FavouritesLayout"
import { HistoryLayout } from "./HistoryLayout"
import { SettingsLayout } from "./SettingsLayout"
import type { L2Tab } from "./L2Tabs"
import { useTTSStore } from "@/stores/useTTSStore"
import { useState } from "react"
import { VOICES } from "../voices"

const LANGUAGE_OPTIONS: DropdownOption[] = [
  { label: "Hindi", value: "hi" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "Bengali", value: "bn" },
  { label: "Marathi", value: "mr" },
  { label: "Kannada", value: "kn" },
  { label: "Malayalam", value: "ml" },
  { label: "Gujarati", value: "gu" },
  { label: "Punjabi", value: "pa" },
]

const GENDER_OPTIONS: DropdownOption[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
]

const CATEGORY_OPTIONS: DropdownOption[] = [
  { label: "IVR", value: "ivr" },
  { label: "Narration", value: "narration" },
  { label: "Business", value: "business" },
  { label: "Assistance", value: "assistance" },
]


export function SpeechLayout({ activeTab }: { activeTab: L2Tab }) {
  const [search, setSearch] = useState("")
  const [language, setLanguage] = useState("")
  const [gender, setGender] = useState("")
  const [category, setCategory] = useState("")

  const {
    selectedVoice,
    isPlaying,
    generationPhase,
    favourites,
    selectVoice,
    togglePlay,
    toggleFavourite,
  } = useTTSStore()

  const filtered = VOICES.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.subtitle.toLowerCase().includes(search.toLowerCase())
  )

  const isLoading = generationPhase === "loading-speech"

  return (
    <div className="flex flex-col flex-1 min-w-0">
      {/* Voice content (kept mounted so selection stays when switching tabs later) */}
      <div className={activeTab === "voice" ? "flex flex-col flex-1 min-w-0" : "hidden"}>
        {/* Header */}
        <div className="flex items-center px-4 py-4">
          <p className="text-body-14 text-[var(--color-text-primary)]">Speech</p>
        </div>

        {/* Search */}
        <div className="px-4">
          <Search
            value={search}
            onChange={setSearch}
            placeholder="Search by name, category,.."
            className="w-full"
            inputClassName="min-w-0"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 px-4 pt-2 pb-3">
          <Dropdown
            options={LANGUAGE_OPTIONS}
            value={language}
            onChange={setLanguage}
            placeholder="Languages"
            searchable
            searchPlaceholder="Search language..."
          />
          <Dropdown
            options={GENDER_OPTIONS}
            value={gender}
            onChange={setGender}
            placeholder="Gender"
          />
          <Dropdown
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={setCategory}
            placeholder="Category"
          />
        </div>

        {/* Voice list */}
        <div className="flex flex-col overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex flex-col px-4 py-2 gap-5 animate-pulse">
              {Array.from({ length: 10 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-[var(--color-2)]/70 shrink-0" />
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-3 rounded-full bg-[var(--color-2)]/70 w-[32%]" />
                    <div className="h-3 rounded-full bg-[var(--color-2)]/70 w-[72%]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            filtered.map((voice) => (
              <SpeechCard
                key={voice.id}
                name={voice.name}
                subtitle={voice.subtitle}
                avatarSrc={voice.avatarSrc}
                starred={voice.starred}
                selected={selectedVoice?.id === voice.id}
                isPlaying={selectedVoice?.id === voice.id && isPlaying}
                favourited={favourites.has(voice.id)}
                onSelect={() => {
                  if (selectedVoice?.id === voice.id) {
                    togglePlay()
                  } else {
                    selectVoice(voice)
                  }
                }}
                onFavourite={() => toggleFavourite(voice.id)}
              />
            ))
          )}
        </div>
      </div>

      {activeTab === "favourites" && <FavouritesLayout />}

      {activeTab === "history" && <HistoryLayout />}

      {activeTab === "settings" && <SettingsLayout />}
    </div>
  )
}

