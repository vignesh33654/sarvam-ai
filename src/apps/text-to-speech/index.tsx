"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { AnimatePresence } from "framer-motion"
import { useTextSelection } from "./hooks/useTextSelection"
import { FloatingActionBar } from "./components/FloatingActionBar"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { Dropdown, type DropdownOption } from "@/components/ui/Dropdown"
import { useTTSStore } from "@/stores/useTTSStore"

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


const VOICES_BY_ID = {
  sindhu: { id: "sindhu", name: "Sindhu", subtitle: "Best for IVR support", avatarSrc: "/Avatar/Type=1.png", starred: true },
  karan: { id: "karan", name: "Karan", subtitle: "Traditional Hindi style", avatarSrc: "/Avatar/Type=3.png", starred: true },
  ananya: { id: "ananya", name: "Ananya", subtitle: "Pleasant and soothing voice", avatarSrc: "/Avatar/Type=4.png", starred: true },
  arjun: { id: "arjun", name: "Arjun", subtitle: "Pleasant voice", avatarSrc: "/Avatar/Type=5.png", starred: true },
  aditi: { id: "aditi", name: "Aditi", subtitle: "Best for Tamil narration style", avatarSrc: "/Avatar/Type=6.png", starred: false },
  priya: { id: "priya", name: "Priya", subtitle: "Polished voice for enterprises", avatarSrc: "/Avatar/Type=7.png", starred: false },
  isha: { id: "isha", name: "Isha", subtitle: "Encouraging voice for assistance flows", avatarSrc: "/Avatar/Type=2.png", starred: false },
  rohan: { id: "rohan", name: "Rohan", subtitle: "Assistance voice", avatarSrc: "/Avatar/Type=5.png", starred: false },
  jackson: { id: "jackson", name: "Jackson", subtitle: "Formal voice for business communications", avatarSrc: "/Avatar/Type=1.png", starred: false },
  neha: { id: "neha", name: "Neha", subtitle: "Friendly default voice for IVR and support", avatarSrc: "/Avatar/Type=2.png", starred: false },
  kavya: { id: "kavya", name: "Kavya", subtitle: "Clear, confident voice for collections", avatarSrc: "/Avatar/Type=7.png", starred: false },
} as const

// Split text into alternating word / whitespace tokens
function tokenize(text: string) {
  return text.split(/(\s+)/).map((chunk, i) => ({
    id: i,
    text: chunk,
    isWord: /\S/.test(chunk),
  }))
}

export function TextToSpeechApp() {
  const [text, setText] = useState(DEMO_TEXT)
  const [selectedLanguage, setSelectedLanguage] = useState("hi")
  const [selectedModel, setSelectedModel] = useState("bulbul-v3")
  const [isGenerating, setIsGenerating] = useState(false)
  const detectTimerRef = useRef<number | null>(null)
  const loadTimerRef = useRef<number | null>(null)

  const {
    isPlaying,
    currentTime,
    duration,
    setDuration,
    setIsPlaying,
    setCurrentTime,
    selectVoice,
    setGenerationPhase,
    highlightText,
  } = useTTSStore()

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)
  const selection   = useTextSelection(textareaRef)

  const charCount        = text.length
  const estimatedSeconds = Math.max(1, Math.round(charCount / 20))

  useEffect(() => {
    if (text.trim().length === 0) {
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [text, setIsPlaying, setCurrentTime])

  useEffect(() => {
    return () => {
      if (detectTimerRef.current) window.clearTimeout(detectTimerRef.current)
      if (loadTimerRef.current) window.clearTimeout(loadTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    const end = el.value.length
    el.setSelectionRange(end, end)
  }, [])

  function runGenerationFlow() {
    if (detectTimerRef.current) window.clearTimeout(detectTimerRef.current)
    if (loadTimerRef.current) window.clearTimeout(loadTimerRef.current)

    setIsGenerating(true)
    setIsPlaying(false)
    setGenerationPhase("detecting-language")
    const nextDuration = estimatedSeconds

    detectTimerRef.current = window.setTimeout(() => {
      setGenerationPhase("loading-speech")
      loadTimerRef.current = window.setTimeout(() => {
        setDuration(nextDuration)
        selectVoice(VOICES_BY_ID.sindhu)
        setIsGenerating(false)
        setGenerationPhase("idle")
      }, 900)
    }, 800)
  }

  // ── Tokenize ──────────────────────────────────────────────────
  const tokens     = useMemo(() => tokenize(text), [text])
  const wordTokens = useMemo(() => tokens.filter(t => t.isWord), [tokens])

  const showHighlight   = isPlaying && highlightText
  const currentWordIndex = useMemo(() => {
    if (!showHighlight || duration <= 0 || wordTokens.length === 0) return -1
    return Math.min(
      Math.floor((currentTime / duration) * wordTokens.length),
      wordTokens.length - 1,
    )
  }, [showHighlight, currentTime, duration, wordTokens.length])

  const currentWordId = currentWordIndex >= 0 ? wordTokens[currentWordIndex]?.id ?? -1 : -1

  const tokenElements = useMemo(() => {
    let wc = 0
    return tokens.map(({ id, text: chunk, isWord }) => {
      if (isWord) {
        const isHighlighted = wc++ === currentWordIndex
        return (
          <span
            key={id}
            data-word-id={id}
            className={
              isHighlighted
                ? "bg-amber-200 rounded-[2px] transition-colors duration-75"
                : undefined
            }
          >
            {chunk}
          </span>
        )
      }
      return <span key={id}>{chunk}</span>
    })
  }, [tokens, currentWordIndex])

  // ── Auto-scroll to keep highlighted word visible ───────────────
  useEffect(() => {
    if (!overlayRef.current || currentWordId < 0) return
    const span = overlayRef.current.querySelector(
      `[data-word-id="${currentWordId}"]`,
    ) as HTMLElement | null
    if (!span) return

    const box       = overlayRef.current.getBoundingClientRect()
    const spanBox   = span.getBoundingClientRect()
    const threshold = 24

    let nextScroll: number | null = null
    if (spanBox.bottom > box.bottom - threshold) {
      nextScroll = overlayRef.current.scrollTop + (spanBox.bottom - box.bottom) + threshold
    } else if (spanBox.top < box.top + threshold) {
      nextScroll = Math.max(0, overlayRef.current.scrollTop - (box.top - spanBox.top) - threshold)
    }

    if (nextScroll !== null) {
      overlayRef.current.scrollTop = nextScroll
      if (textareaRef.current) textareaRef.current.scrollTop = nextScroll
    }
  }, [currentWordId])

  // Sync overlay scroll when user manually scrolls the textarea
  function handleScroll(e: React.UIEvent<HTMLTextAreaElement>) {
    if (overlayRef.current) {
      overlayRef.current.scrollTop = e.currentTarget.scrollTop
    }
  }

  return (
    <>
      <div className="flex p-4 w-full h-full">
        <div className="flex flex-col gap-3 w-full h-full">

          {/* Language selector (hidden for now) */}
          <div className="hidden items-center gap-2 px-4">
            <span className="text-body-16 text-[var(--color-text-tertiary)]">Detect language:</span>
            <Dropdown
              options={LANGUAGES}
              value={selectedLanguage}
              onChange={(language) => {
                setSelectedLanguage(language)
                runGenerationFlow()
              }}
              searchable
            />
          </div>

          {/* Main card */}
          <div className="relative flex flex-col flex-1 gap-6 bg-white border border-[var(--color-divider)] rounded-3xl p-4 min-h-0">

            {/* Clear button */}
            {text.length > 0 && (
              <button
                onClick={() => setText("")}
                className="absolute top-4 right-4 z-20 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label="Clear text"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={24} />
              </button>
            )}

            {/* Textarea + highlight overlay */}
            <div className="relative flex-1 min-h-0">
              {/* Mirror overlay — renders highlighted word spans */}
              <div
                ref={overlayRef}
                aria-hidden
                className="absolute inset-0 pr-8 overflow-hidden pointer-events-none select-none text-body-16 text-[var(--color-text-primary)]"
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                {showHighlight ? tokenElements : null}
              </div>

              {/* Actual editable textarea — text becomes transparent while highlight is active */}
              <textarea
                ref={textareaRef}
                autoFocus
                onScroll={handleScroll}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className={[
                  "absolute inset-0 w-full h-full resize-none outline-none text-body-16 bg-transparent pr-8",
                  showHighlight
                    ? "text-transparent caret-[var(--color-text-primary)]"
                    : "text-[var(--color-text-primary)]",
                  "placeholder:text-[var(--color-text-tertiary)]",
                ].join(" ")}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center shrink-0">
              <div className="flex items-center gap-2 ml-auto">
                {text.trim().length > 0 && (
                  <span className="text-body-16 text-[var(--color-text-tertiary)]">
                    {charCount} ~ {estimatedSeconds}s
                  </span>
                )}

                <Dropdown
                  options={MODELS}
                  value={selectedModel}
                  onChange={setSelectedModel}
                  side="top"
                  align="right"
                  triggerClassName="h-10 px-4"
                />

                <button
                  onClick={runGenerationFlow}
                  disabled={isGenerating || text.trim().length === 0}
                  className={[
                    "h-10 w-[160px] rounded-full text-body-16 transition-colors",
                    "inline-flex items-center justify-center gap-2",
                    "bg-[var(--color-text-primary)] text-white",
                    "disabled:opacity-60 disabled:text-white/70 disabled:cursor-not-allowed hover:opacity-90",
                  ].join(" ")}
                >
                  {isGenerating ? (
                    <svg
                      viewBox="0 0 16 16"
                      className="size-4 animate-spin"
                      aria-hidden
                    >
                      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" />
                      <path d="M8 2a6 6 0 0 1 6 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                  ) : (
                    <span>Generate speech</span>
                  )}
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
