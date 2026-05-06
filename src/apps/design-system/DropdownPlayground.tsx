"use client"

import { useState } from "react"
import { Dropdown, type DropdownOption } from "@/components/ui/Dropdown"
import { Search } from "@/components/ui/Search"
import { SpeechCard } from "@/apps/text-to-speech/components/SpeechCard"

const LANGUAGES: DropdownOption[] = [
  { label: "Afrikaans",   value: "af" },
  { label: "Arabic",      value: "ar" },
  { label: "Armenian",    value: "hy" },
  { label: "Assamese",    value: "as" },
  { label: "Asturian",    value: "ast" },
  { label: "Azerbaijani", value: "az" },
  { label: "Belarusian",  value: "be" },
  { label: "Bengali",     value: "bn" },
  { label: "Bosnian",     value: "bs" },
  { label: "Hindi",       value: "hi" },
  { label: "Tamil",       value: "ta" },
  { label: "Telugu",      value: "te" },
]

const MODELS: DropdownOption[] = [
  { label: "Bulbul V3", value: "v3" },
  { label: "Bulbul V2", value: "v2" },
  { label: "Bulbul V1", value: "v1" },
]

const SIZES: DropdownOption[] = [
  { label: "Small",  value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large",  value: "lg" },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-body-14 text-[var(--color-text-tertiary)] uppercase tracking-widest">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4 items-start">{children}</div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 items-start">
      {children}
    </div>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-body-12 text-[var(--color-text-tertiary)]">{children}</span>
  )
}

export function DropdownPlayground() {
  const [lang, setLang]     = useState("hi")
  const [model, setModel]   = useState("v3")
  const [size, setSize]     = useState("md")
  const [langTop, setLangTop] = useState("hi")
  const [searchValue, setSearchValue] = useState("")
  const [searchCompactValue, setSearchCompactValue] = useState("Sindhu")
  const [activeVoice, setActiveVoice] = useState<"sindhu" | "aditya">("sindhu")

  return (
    <div className="flex flex-col gap-10">

      {/* Without search */}
      <Section title="Without search">
        <Label>
          <Caption>Default (bottom-left)</Caption>
          <Dropdown options={MODELS} value={model} onChange={setModel} />
        </Label>
        <Label>
          <Caption>Bottom-right</Caption>
          <Dropdown options={SIZES} value={size} onChange={setSize} align="right" />
        </Label>
        <Label>
          <Caption>Opens upward</Caption>
          <Dropdown options={MODELS} value={model} onChange={setModel} side="top" />
        </Label>
      </Section>

      {/* With search */}
      <Section title="With search">
        <Label>
          <Caption>Searchable (bottom-left)</Caption>
          <Dropdown
            options={LANGUAGES}
            value={lang}
            onChange={setLang}
            searchable
            searchPlaceholder="Search languages..."
          />
        </Label>
        <Label>
          <Caption>Searchable (opens upward)</Caption>
          <Dropdown
            options={LANGUAGES}
            value={langTop}
            onChange={setLangTop}
            searchable
            side="top"
          />
        </Label>
      </Section>

      {/* State */}
      <Section title="Search">
        <Label>
          <Caption>Default rounded search</Caption>
          <Search
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search voices..."
          />
        </Label>
        <Label>
          <Caption>Compact width</Caption>
          <Search
            value={searchCompactValue}
            onChange={setSearchCompactValue}
            placeholder="Search..."
            className="w-[280px]"
            inputClassName="min-w-0"
          />
        </Label>
      </Section>

      <Section title="Speech card">
        <div className="w-full max-w-md rounded-2xl border border-[var(--color-divider)] bg-white overflow-hidden">
          <SpeechCard
            name="Sindhu"
            subtitle="Best for IVR support"
            selected={activeVoice === "sindhu"}
            starred
            onSelect={() => setActiveVoice("sindhu")}
          />
          <SpeechCard
            name="Aditya"
            subtitle="Great for conversational style"
            avatarSrc="/Avatar/Type=2.png"
            selected={activeVoice === "aditya"}
            starred={false}
            onSelect={() => setActiveVoice("aditya")}
          />
        </div>
      </Section>

      {/* State */}
      <Section title="Current values">
        <div className="flex flex-col gap-1 text-body-14 text-[var(--color-text-secondary)]">
          <span>Language: <strong className="text-[var(--color-text-primary)]">{lang}</strong></span>
          <span>Model: <strong className="text-[var(--color-text-primary)]">{model}</strong></span>
          <span>Size: <strong className="text-[var(--color-text-primary)]">{size}</strong></span>
          <span>Search: <strong className="text-[var(--color-text-primary)]">{searchValue || "—"}</strong></span>
          <span>Selected voice: <strong className="text-[var(--color-text-primary)]">{activeVoice}</strong></span>
        </div>
      </Section>

    </div>
  )
}
