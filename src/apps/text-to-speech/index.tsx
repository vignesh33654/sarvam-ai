"use client"

import { useState, useEffect, useRef } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  Cancel01Icon,
  PlayIcon,
  StopIcon,
} from "@hugeicons/core-free-icons"

const LANGUAGES = [
  "Auto-detect",
  "Hindi",
  "Tamil",
  "Telugu",
  "Bengali",
  "Marathi",
  "Kannada",
  "Malayalam",
  "Gujarati",
  "Punjabi",
]

const MODELS = ["Bulbul V3", "Bulbul V2", "Bulbul V1"]

const DEMO_TEXT = `नमस्ते! Sarvam AI में आपका स्वागत है।

हम भारतीय भाषाओं के लिए अत्याधुनिक voice technology बनाते हैं। हमारे text-to-speech models प्राकृतिक और इंसान जैसी आवाज़ें produce करते हैं, जो बेहद realistic लगती हैं।

आप अपना text type कर सकते हैं या different voices को try करने के लिए किसी भी voice card पर play button पर click कर सकते हैं। तो चलिए, अपनी भाषा में AI की ताकत experience करें!`

const CREDITS = 17

export function TextToSpeechApp() {
  const [text, setText] = useState(DEMO_TEXT)
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi")
  const [selectedModel, setSelectedModel] = useState("Bulbul V3")
  const [isPlaying, setIsPlaying] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [modelOpen, setModelOpen] = useState(false)

  const langRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const charCount = text.length
  const estimatedSeconds = Math.round(charCount / 20)

  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.focus()
      el.setSelectionRange(el.value.length, el.value.length)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex p-4 w-full h-full">
      <div className="flex flex-col gap-3 w-full max-w-[761px] h-full mx-auto">

        {/* Language selector bar */}
        <div ref={langRef} className="relative flex items-center px-4">
          <button
            onClick={() => setLangOpen(prev => !prev)}
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
          >
            <span className="text-body-14 text-[var(--color-text-tertiary)]">Detect language:</span>
            <span className="text-body-14 text-[var(--color-text-primary)]">{selectedLanguage}</span>
            <HugeiconsIcon icon={ArrowDown01Icon} size={16} color="var(--color-text-primary)" />
          </button>

          {langOpen && (
            <div className="absolute z-10 top-full left-4 mt-1 bg-white border border-[var(--color-divider)] rounded-xl shadow-sm py-1 min-w-[160px]">
              {LANGUAGES.map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang === "Auto-detect" ? "Auto" : lang)
                    setLangOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-body-14 hover:bg-[var(--color-2)] transition-colors ${
                    selectedLanguage === lang || (lang === "Auto-detect" && selectedLanguage === "Auto")
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
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
              <span className="text-body-12 text-[var(--color-text-tertiary)]">{CREDITS} credits left</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-body-12 text-[var(--color-text-tertiary)]">
                {charCount} ~ {estimatedSeconds}s
              </span>

              {/* Model selector */}
              <div ref={modelRef} className="relative">
                <button
                  onClick={() => setModelOpen(prev => !prev)}
                  className="flex items-center gap-0.5 px-1 py-1 text-body-14 text-[var(--color-text-primary)] hover:opacity-70 transition-opacity"
                >
                  {selectedModel}
                  <HugeiconsIcon icon={ArrowDown01Icon} size={16} color="var(--color-text-primary)" />
                </button>

                {modelOpen && (
                  <div className="absolute z-10 bottom-full right-0 mb-1 bg-white border border-[var(--color-divider)] rounded-xl shadow-sm py-1 min-w-[140px]">
                    {MODELS.map(model => (
                      <button
                        key={model}
                        onClick={() => {
                          setSelectedModel(model)
                          setModelOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-body-14 hover:bg-[var(--color-2)] transition-colors ${
                          selectedModel === model
                            ? "text-[var(--color-text-primary)]"
                            : "text-[var(--color-text-secondary)]"
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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
  )
}
