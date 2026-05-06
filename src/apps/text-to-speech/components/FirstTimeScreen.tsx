"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, AiMagicIcon } from "@hugeicons/core-free-icons"

const DEMO_TEXT_HI = `नमस्ते! Sarvam AI में आपका स्वागत है। \n\nहम भारतीय भाषाओं के लिए अत्याधुनिक voice technology बनाते हैं। हमारे text-to-speech models प्राकृतिक और इंसान जैसी आवाज़ें produce करते हैं, जो बेहद realistic लगती हैं।`

const DEMO_TEXT_EN = `Hello! Welcome to Sarvam AI.\n\nWe build cutting-edge voice technology for Indian languages. Our text-to-speech models produce natural and human-like voices that sound incredibly realistic.`

const FEATURED_VOICES = [
  { id: "karan",  name: "Karan",  subtitle: "Traditional Hindi style",  avatarSrc: "/Avatar/Type=3.png" },
  { id: "sindhu", name: "Sindhu", subtitle: "IVR voice call & support", avatarSrc: "/Avatar/Type=1.png" },
  { id: "arjun",  name: "Arjun",  subtitle: "Pleasant voice",           avatarSrc: "/Avatar/Type=5.png" },
]

export function FirstTimeScreen() {
  const [text, setText] = useState(DEMO_TEXT_HI)
  const [isEnglish, setIsEnglish] = useState(false)

  const charCount = text.length
  const estimatedSeconds = Math.max(1, Math.round(charCount / 20))

  function toggleLanguage() {
    if (isEnglish) {
      setText(DEMO_TEXT_HI)
      setIsEnglish(false)
    } else {
      setText(DEMO_TEXT_EN)
      setIsEnglish(true)
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4 gap-3 h-full">
      <div className="flex flex-col gap-3 w-full max-w-3xl">

        {/* Welcome card */}
        <div className="relative flex flex-col gap-6 bg-white border border-[var(--color-divider)] rounded-3xl p-4">

          {/* Clear button */}
          {text.length > 0 && (
            <button
              onClick={() => setText("")}
              className="absolute top-4 right-4 z-10 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Clear text"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={24} />
            </button>
          )}

          {/* Text area */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full resize-none outline-none text-body-14 text-[var(--color-text-primary)] bg-transparent pr-8 placeholder:text-[var(--color-text-tertiary)]"
            placeholder="Type or paste your text here..."
          />

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Try language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-body-14 text-[#7260e0] hover:opacity-80 transition-opacity"
            >
              <HugeiconsIcon icon={AiMagicIcon} size={16} color="#7260e0" />
              {isEnglish ? "Try Hindi" : "Try English"}
            </button>

            {/* Right: char count + generate */}
            <div className="flex items-center gap-3">
              {text.trim().length > 0 && (
                <span className="text-body-12 text-[var(--color-text-tertiary)]">
                  {charCount} ~ {estimatedSeconds}s
                </span>
              )}
              <button
                disabled={text.trim().length === 0}
                className={[
                  "h-8 px-4 rounded-full text-body-12 transition-colors",
                  "inline-flex items-center justify-center",
                  "bg-[var(--color-text-primary)] text-white",
                  "disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90",
                ].join(" ")}
              >
                Generate voice
              </button>
            </div>
          </div>
        </div>

        {/* Suggested voice cards */}
        <div className="grid grid-cols-3 gap-3">
          {FEATURED_VOICES.map((voice) => (
            <button
              key={voice.id}
              className="flex items-center gap-3 bg-white border border-[var(--color-divider)] rounded-2xl px-4 py-3 text-left hover:bg-[var(--color-1)] transition-colors"
            >
              <div className="relative shrink-0 size-12 rounded-full overflow-hidden">
                <img src={voice.avatarSrc} alt={voice.name} className="size-full object-cover" />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-body-14 text-[var(--color-text-primary)] truncate">{voice.name}</p>
                <p className="text-body-14 text-[var(--color-text-secondary)] truncate">{voice.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
