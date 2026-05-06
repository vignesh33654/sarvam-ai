"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { AnimatePresence, motion } from "framer-motion"
import { useTTSStore } from "@/stores/useTTSStore"

// ── Helpers ────────────────────────────────────────────────────────────────

interface SelectOption { label: string; value: string }

function SettingSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: SelectOption[]
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = options.find((o) => o.value === value)

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[14px] leading-5 text-[var(--color-text-primary)]">{label}</p>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="flex items-center w-full border border-[var(--color-divider)] rounded-full px-3 py-2 bg-white hover:bg-[var(--color-1)] transition-colors"
        >
          <span className="flex-1 text-left text-[14px] leading-5 text-[var(--color-text-primary)]">
            {selected?.label ?? "Select…"}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center"
          >
            <HugeiconsIcon icon={ArrowDown01Icon} size={16} className="text-[var(--color-text-primary)]" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.12, ease: "easeOut" } }}
              exit={{ opacity: 0, scale: 0.97, y: -4, transition: { duration: 0.08, ease: "easeIn" } }}
              className="absolute left-0 top-full mt-1 w-full bg-white border border-[var(--color-divider)] rounded-2xl shadow-sm z-20 py-1 overflow-hidden"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className={[
                    "w-full text-left px-4 py-2 text-[14px] leading-5 rounded-xl mx-auto transition-colors",
                    opt.value === value
                      ? "text-[var(--color-text-primary)] bg-[var(--color-1)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-2)]",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SpeedSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const min = 0.5
  const max = 2.0
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[14px] leading-5 text-[var(--color-text-primary)]">Speed</p>
        <div className="border border-[var(--color-divider)] rounded-full px-3 py-1 bg-white">
          <span className="text-[14px] leading-5 text-[var(--color-text-primary)]">
            {value.toFixed(2)}X
          </span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:size-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border
          [&::-webkit-slider-thumb]:border-[var(--color-divider)]
          [&::-webkit-slider-thumb]:shadow-sm
          [&::-moz-range-thumb]:size-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border
          [&::-moz-range-thumb]:border-[var(--color-divider)]"
        style={{
          background: `linear-gradient(to right, #141414 ${pct}%, #f0f0f0 ${pct}%)`,
        }}
      />
    </div>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative flex items-center w-[44px] h-[24px] rounded-full shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text-primary)]"
      style={{ backgroundColor: checked ? "#141414" : "#e0e0e0" }}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute size-[20px] bg-white rounded-full shadow-sm"
        style={{ left: checked ? "calc(100% - 22px)" : "2px" }}
      />
    </button>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────

const MODEL_OPTIONS: SelectOption[] = [
  { label: "Bulbul V3", value: "bulbul-v3" },
  { label: "Bulbul V2", value: "bulbul-v2" },
  { label: "Bulbul V1", value: "bulbul-v1" },
]

const QUALITY_OPTIONS: SelectOption[] = [
  { label: "Standard (22.05 kHz)", value: "standard" },
  { label: "High (44.1 kHz)", value: "high" },
]

const FORMAT_OPTIONS: SelectOption[] = [
  { label: "mp3", value: "mp3" },
  { label: "wav", value: "wav" },
  { label: "ogg", value: "ogg" },
]

// ── Main component ─────────────────────────────────────────────────────────

export function SettingsLayout() {
  const { highlightText, setHighlightText } = useTTSStore()

  const [model, setModel] = useState("bulbul-v3")
  const [audioQuality, setAudioQuality] = useState("standard")
  const [speed, setSpeed] = useState(1.1)
  const [format, setFormat] = useState("mp3")

  return (
    <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-4 py-4 shrink-0">
        <p className="text-body-14 text-[var(--color-text-primary)]">Settings</p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 px-4 py-2 overflow-y-auto flex-1">
        <SettingSelect label="Model" options={MODEL_OPTIONS} value={model} onChange={setModel} />
        <SettingSelect label="Audio Quality" options={QUALITY_OPTIONS} value={audioQuality} onChange={setAudioQuality} />
        <SpeedSlider value={speed} onChange={setSpeed} />
        <SettingSelect label="Download format" options={FORMAT_OPTIONS} value={format} onChange={setFormat} />

        {/* Divider */}
        <div className="h-px bg-[var(--color-divider)]" />

        {/* Highlight toggle */}
        <div className="flex items-center gap-4">
          <p className="flex-1 text-[14px] leading-5 text-[var(--color-text-primary)]">
            Highlight text when audio play
          </p>
          <Toggle checked={highlightText} onChange={setHighlightText} />
        </div>
      </div>
    </div>
  )
}
