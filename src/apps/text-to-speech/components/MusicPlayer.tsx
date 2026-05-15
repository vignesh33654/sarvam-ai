"use client"

import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  FavouriteIcon,
  Download01Icon,
} from "@hugeicons/core-free-icons"
import { useTTSStore } from "@/stores/useTTSStore"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

type IconBtnProps = {
  label: string
  onClick?: () => void
  active?: boolean
  children: React.ReactNode
}

function IconBtn({ label, onClick, active = false, children }: IconBtnProps) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            aria-label={label}
            className={[
              "size-10 rounded-full flex items-center justify-center transition-colors",
              "hover:bg-[var(--color-2)]",
              active
                ? "text-[var(--color-text-primary)]"
                : "text-[var(--color-text-secondary)]",
            ].join(" ")}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const SPEEDS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]

export function MusicPlayer() {
  const {
    selectedVoice,
    isPlaying,
    currentTime,
    duration,
    favourites,
    feedback,
    togglePlay,
    setCurrentTime,
    toggleFavourite,
    setFeedback,
  } = useTTSStore()

  const [speed, setSpeed] = useState(1.0)

  function cycleSpeed() {
    const idx = SPEEDS.indexOf(speed)
    setSpeed(SPEEDS[(idx + 1) % SPEEDS.length])
  }

  const progressRef = useRef<HTMLDivElement>(null)

  // Spacebar toggles play/pause (like YT Music) — skips when typing in inputs
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space" || e.repeat) return
      const tag = (e.target as HTMLElement).tagName
      if (tag === "TEXTAREA" || tag === "INPUT" || (e.target as HTMLElement).isContentEditable) return
      e.preventDefault()
      togglePlay()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [togglePlay])

  // Simulate playback
  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      const state = useTTSStore.getState()
      if (state.currentTime >= state.duration) {
        state.setIsPlaying(false)
        state.setCurrentTime(0)
      } else {
        state.setCurrentTime(state.currentTime + 0.1)
      }
    }, 100)
    return () => clearInterval(id)
  }, [isPlaying])

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!progressRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setCurrentTime(ratio * duration)
  }

  if (!selectedVoice) return null

  const activeVoice = selectedVoice

  function handleFeedback(type: "up" | "down") {
    const current = feedback[activeVoice.id]
    setFeedback(activeVoice.id, current === type ? null : type)
  }
  const voiceFeedback = feedback[activeVoice.id] ?? null
  const isFavourited = favourites.has(activeVoice.id)
  const progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0

  return (
    <div className="flex items-center px-6 py-3 bg-[#fafafa] border-t border-[var(--color-divider)] shrink-0">

      {/* Left: voice info */}
      <div className="flex items-center gap-3 w-[202px] shrink-0">
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative shrink-0 size-12 cursor-default">
                <img
                  src={activeVoice.avatarSrc}
                  alt={activeVoice.name}
                  className="size-full rounded-full object-cover"
                />
                {activeVoice.starred && (
                  <TooltipProvider delayDuration={150}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute -top-[3px] left-[30px] size-[18px] flex items-center justify-center cursor-default">
                          <img src="/Star 1.svg" alt="" aria-hidden className="size-[13px]" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">Recommended for this language</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">{activeVoice.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-body-14 text-[var(--color-text-primary)]">{activeVoice.name}</p>
          <p className="text-body-14 text-[var(--color-text-secondary)] truncate">{activeVoice.subtitle}</p>
        </div>
      </div>

      {/* Center: play + progress */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2 min-w-0 px-4">
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="size-10 rounded-full flex items-center justify-center hover:bg-[var(--color-2)] transition-colors"
        >
          <img
            src={isPlaying ? "/Pause.svg" : "/Play.svg"}
            alt=""
            aria-hidden
            className="size-10 object-contain"
          />
        </button>

        {/* Progress bar + time */}
        <div className="flex items-center gap-3 w-full max-w-[440px]">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className="relative flex-1 h-1 bg-[#f0f0f0] rounded-full cursor-pointer hover:h-[6px] transition-all"
                >
                  <div
                    className="absolute left-0 top-0 h-full bg-[#141414] rounded-full transition-all"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">Seek</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-[12px] leading-4 text-black shrink-0 tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-[9px] justify-end w-[240px] shrink-0">
        <div className="flex items-center gap-1.5">
          <IconBtn
            label="Like"
            onClick={() => handleFeedback("up")}
            active={voiceFeedback === "up"}
          >
            <HugeiconsIcon
              icon={ThumbsUpIcon}
              size={20}
              color="currentColor"
              fill={voiceFeedback === "up" ? "currentColor" : "none"}
            />
          </IconBtn>

          <IconBtn
            label="Dislike"
            onClick={() => handleFeedback("down")}
            active={voiceFeedback === "down"}
          >
            <HugeiconsIcon
              icon={ThumbsDownIcon}
              size={20}
              color="currentColor"
              fill={voiceFeedback === "down" ? "currentColor" : "none"}
            />
          </IconBtn>
        </div>

        {/* Divider */}
        <div className="w-[2px] h-[22px] bg-[#d9d9d9] shrink-0" />

        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={cycleSpeed}
                aria-label="Playback speed"
                className="h-8 w-12 rounded-full text-[12px] font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-2)] transition-colors tabular-nums"
              >
                {speed === 1.0 ? "1x" : `${speed}x`}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Playback speed</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <IconBtn
          label={isFavourited ? "Remove from favourites" : "Add to favourites"}
          onClick={() => toggleFavourite(activeVoice.id)}
          active={isFavourited}
        >
          {isFavourited ? (
            <img src="/Favourite filled.svg" alt="" aria-hidden className="size-5 object-contain" />
          ) : (
            <HugeiconsIcon icon={FavouriteIcon} size={20} color="currentColor" />
          )}
        </IconBtn>

        <IconBtn label="Download">
          <HugeiconsIcon icon={Download01Icon} size={20} color="currentColor" />
        </IconBtn>
      </div>
    </div>
  )
}
