"use client"

import { useState, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { useTextSelection } from "./hooks/useTextSelection"
import { FloatingActionBar } from "./components/FloatingActionBar"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, PlayIcon, StopIcon } from "@hugeicons/core-free-icons"
import { Dropdown, type DropdownOption } from "@/components/ui/Dropdown"

const LANGUAGES: DropdownOption[] = [
  { label: "Auto-detect", value: "auto" },
  { label: "Hindi",       value: "hi" },
  { label: "Tamil",       value: "ta" },
  { label: "Telugu",      value: "te" },
  { label: "Bengali",     value: "bn" },
  { label: "Marathi",     value: "mr" },
  { label: "Kannada",     value: "kn" },
  { label: "Malayalam",   value: "ml" },
  { label: "Gujarati",    value: "gu" },
  { label: "Punjabi",     value: "pa" },
]

const MODELS: DropdownOption[] = [
  { label: "Bulbul V3", value: "bulbul-v3" },
  { label: "Bulbul V2", value: "bulbul-v2" },
  { label: "Bulbul V1", value: "bulbul-v1" },
]

const DEMO_TEXT = `नमस्ते! Sarvam AI में आपका स्वागत है।

हम भारतीय भाषाओं के लिए अत्याधुनिक voice technology बनाते हैं। हमारे text-to-speech models प्राकृतिक और इंसान जैसी आवाज़ें produce करते हैं, जो बेहद realistic लगती हैं।

आप अपना text type कर सकते हैं या different voices को try करने के लिए किसी भी voice card पर play button पर click कर सकते हैं। तो चलिए, अपनी भाषा में AI की ताकत experience करें!`

const CREDITS = 17

export function TextToSpeechApp() {
  const [text, setText] = useState(DEMO_TEXT)
  const [selectedLanguage, setSelectedLanguage] = useState("hi")
  const [selectedModel, setSelectedModel] = useState("bulbul-v3")
  const [isPlaying, setIsPlaying] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const selection = useTextSelection(textareaRef)

  const charCount = text.length
  const estimatedSeconds = Math.round(charCount / 20)

  return (
    <>
      <div className="flex p-4 w-full h-full">
        <div className="flex flex-col gap-3 w-full max-w-[761px] h-full mx-auto">

          {/* Language selector bar */}
          <div className="flex items-center gap-2 px-4">
            <span className="text-body-14 text-[var(--color-text-tertiary)]">Detect language:</span>
            <Dropdown
              options={LANGUAGES}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              searchable
            />
          </div>

          {/* Main input card */}
          <div className="relative flex flex-col flex-1 gap-6 bg-white border border-[var(--color-divider)] rounded-3xl p-4 min-h-0">

            {/* Clear button */}
            {text.length > 0 && (
              <button
                onClick={() => setText("")}
                className="absolute top-4 right-4 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label="Clear text"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={24} />
              </button>
            )}

            {/* Textarea */}
            <div className="flex flex-1 min-h-0 pr-8">
              <textarea
                ref={textareaRef}
                autoFocus
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="flex-1 h-full resize-none outline-none text-body-14 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] bg-transparent"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center shrink-0">
              {/* Credits */}
              <div className="flex items-center gap-1">
                <img src="/credits.svg" width={16} height={16} alt="credits" />
                <span className="text-body-14 text-[var(--color-text-tertiary)]">{CREDITS} credits left</span>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-body-14 text-[var(--color-text-tertiary)]">
                  {charCount} ~ {estimatedSeconds}s
                </span>

                {/* Model selector */}
                <Dropdown
                  options={MODELS}
                  value={selectedModel}
                  onChange={setSelectedModel}
                  side="top"
                  align="right"
                />

                {/* Play / Stop button */}
                <button
                  onClick={() => setIsPlaying(prev => !prev)}
                  className="size-8 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label={isPlaying ? "Stop" : "Play"}
                >
                  <HugeiconsIcon
                    icon={isPlaying ? StopIcon : PlayIcon}
                    size={16}
                    color="white"
                  />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {selection && (
          <FloatingActionBar key="floating-bar" position={selection} />
        )}
      </AnimatePresence>
    </>
  )
}
