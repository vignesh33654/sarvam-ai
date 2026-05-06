"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, PlayIcon, PauseIcon } from "@hugeicons/core-free-icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const EMOTIONS = [
  { emoji: "😊", label: "Happy"     },
  { emoji: "😢", label: "Sad"       },
  { emoji: "😡", label: "Angry"     },
  { emoji: "😜", label: "Joy"       },
  { emoji: "😰", label: "Disgusted" },
]

interface Props {
  position: { x: number; y: number }
}

export function FloatingActionBar({ position }: Props) {
  const [isPlaying,       setIsPlaying]       = useState(false)
  const [isOpen,          setIsOpen]          = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState(EMOTIONS[0])

  return (
    <div
      data-floating-bar
      style={{
        position: "fixed",
        left: position.x,
        // top is pinned just below the selection; expansion always grows downward
        top: position.y + 8,
        translate: "-50% 0",
        zIndex: 50,
      }}
    >
      <TooltipProvider delayDuration={1000}>
        <div
          className="bg-white border border-[var(--color-divider)] overflow-hidden"
          style={{
            borderRadius: isOpen ? 14 : 9999,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          {isOpen ? (

            /* ── Expanded: voice emotion picker ── */
            <div className="flex flex-col gap-[10px] px-[12px] py-[8px]">
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 hover:opacity-70 transition-opacity"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="var(--color-text-primary)" />
                <span className="text-body-14 text-[var(--color-text-primary)]">Voice</span>
              </button>

              {EMOTIONS.map((em) => (
                <button
                  key={em.label}
                  onClick={() => { setSelectedEmotion(em); setIsOpen(false) }}
                  className={[
                    "flex items-center gap-2 px-1 py-0.5 rounded-md w-full text-left transition-colors",
                    "hover:bg-[var(--color-2)]",
                  ].join(" ")}
                >
                  <span className="text-base leading-5 shrink-0">{em.emoji}</span>
                  <span
                    className={[
                      "text-body-14 whitespace-nowrap",
                      selectedEmotion.label === em.label
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-secondary)]",
                    ].join(" ")}
                  >
                    {em.label}
                  </span>
                </button>
              ))}
            </div>

          ) : (

            /* ── Collapsed: pill toolbar ── */
            <div className="flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsPlaying(prev => !prev)}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="flex items-center justify-center size-10 rounded-l-full hover:bg-[var(--color-2)] transition-colors ml-1"
                  >
                    <HugeiconsIcon
                      icon={isPlaying ? PauseIcon : PlayIcon}
                      size={20}
                      color="var(--color-text-primary)"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">{isPlaying ? "Pause" : "Play"}</TooltipContent>
              </Tooltip>

              <div className="w-px h-[21px] bg-[var(--color-divider)]" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Voice emotion"
                    className="flex items-center justify-center size-10 rounded-r-full hover:bg-[var(--color-2)] transition-colors mr-1"
                  >
                    <span className="text-xl leading-none">{selectedEmotion.emoji}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">Voice Emotion</TooltipContent>
              </Tooltip>
            </div>

          )}
        </div>
      </TooltipProvider>
    </div>
  )
}
