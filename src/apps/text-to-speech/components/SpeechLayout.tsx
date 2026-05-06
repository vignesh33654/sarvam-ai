"use client"

import { useState } from "react"
import { Search } from "@/components/ui/Search"
import { Dropdown, type DropdownOption } from "@/components/ui/Dropdown"
import { SpeechCard } from "./SpeechCard"
import type { L2Tab } from "./L2Tabs"

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

const VOICES = [
  { id: "sindhu",  name: "Sindhu",  subtitle: "Best for IVR support",                    avatarSrc: "/Avatar/Type=1.png", starred: true },
  { id: "karan",   name: "Karan",   subtitle: "Traditional Hindi style",                  avatarSrc: "/Avatar/Type=3.png", starred: true },
  { id: "ananya",  name: "Ananya",  subtitle: "Pleasant and soothing voice",              avatarSrc: "/Avatar/Type=4.png", starred: true },
  { id: "arjun",   name: "Arjun",   subtitle: "Pleasant voice",                           avatarSrc: "/Avatar/Type=5.png", starred: true },
  { id: "aditi",   name: "Aditi",   subtitle: "Best for Tamil narration style",            avatarSrc: "/Avatar/Type=6.png", starred: false },
  { id: "priya",   name: "Priya",   subtitle: "Polished voice for enterprises",            avatarSrc: "/Avatar/Type=7.png", starred: false },
  { id: "isha",    name: "Isha",    subtitle: "Encouraging voice for assistance flows",    avatarSrc: "/Avatar/Type=2.png", starred: false },
  { id: "rohan",   name: "Rohan",   subtitle: "Assistance voice",                         avatarSrc: "/Avatar/Type=5.png", starred: false },
  { id: "jackson", name: "Jackson", subtitle: "Formal voice for business communications", avatarSrc: "/Avatar/Type=1.png", starred: false },
  { id: "neha",    name: "Neha",    subtitle: "Friendly default voice for IVR and support", avatarSrc: "/Avatar/Type=2.png", starred: false },
  { id: "kavya",   name: "Kavya",   subtitle: "Clear, confident voice for collections",   avatarSrc: "/Avatar/Type=7.png", starred: false },
]

export function SpeechLayout({ activeTab }: { activeTab: L2Tab }) {
  const [search, setSearch] = useState("")
  const [language, setLanguage] = useState("")
  const [gender, setGender] = useState("")
  const [category, setCategory] = useState("")

  // Voice selection state (for the currently visible voice list)
  const [selectedVoice, setSelectedVoice] = useState("sindhu")
  const [isPlaying, setIsPlaying] = useState(false)
  const [favourites, setFavourites] = useState<Set<string>>(new Set())

  const filtered = VOICES.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.subtitle.toLowerCase().includes(search.toLowerCase())
  )

  function toggleFavourite(id: string) {
    setFavourites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

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
          {filtered.map((voice) => (
            <SpeechCard
              key={voice.id}
              name={voice.name}
              subtitle={voice.subtitle}
              avatarSrc={voice.avatarSrc}
              starred={voice.starred}
              selected={selectedVoice === voice.id}
              isPlaying={selectedVoice === voice.id && isPlaying}
              favourited={favourites.has(voice.id)}
              onSelect={() => {
                if (selectedVoice === voice.id) {
                  setIsPlaying((prev) => !prev)
                } else {
                  setSelectedVoice(voice.id)
                  setIsPlaying(true)
                }
              }}
              onFavourite={() => toggleFavourite(voice.id)}
            />
          ))}
        </div>
      </div>

      {/* Future: favourites/history/settings content */}
      {activeTab !== "voice" && (
        <div className="flex flex-col flex-1 min-w-0 items-center justify-center text-body-14 text-[var(--color-text-tertiary)]">
          Coming soon
        </div>
      )}
    </div>
  )
}

