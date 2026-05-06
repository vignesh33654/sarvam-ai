"use client"

import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon, FavouriteIcon } from "@hugeicons/core-free-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const DEFAULT_AVATAR = "/Avatar/Type=1.png"

type SpeechCardProps = {
  name?: string
  subtitle?: string
  avatarSrc?: string
  selected?: boolean
  isPlaying?: boolean
  starred?: boolean
  favourited?: boolean
  onSelect?: () => void
  onFavourite?: (e: React.MouseEvent) => void
}

export function SpeechCard({
  name = "Sindhu",
  subtitle = "Best for IVR support",
  avatarSrc = DEFAULT_AVATAR,
  selected = false,
  isPlaying = false,
  starred = true,
  favourited = false,
  onSelect,
  onFavourite,
}: SpeechCardProps) {
  const [isFavourited, setIsFavourited] = useState(favourited)

  useEffect(() => {
    setIsFavourited(favourited)
  }, [favourited])

  return (
    <TooltipProvider delayDuration={150}>
      <div
        onClick={onSelect}
        className={[
          "group flex items-center justify-between px-4 py-3 cursor-pointer transition-colors",
          selected ? "bg-[var(--color-1)]" : "bg-white hover:bg-[var(--color-1)]",
        ].join(" ")}
      >
        {/* Left: avatar + text */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative shrink-0 size-12">
            {/* Colored avatar — visible in default, fades on hover/selected */}
            <div
              className={[
                "absolute inset-0 rounded-full overflow-hidden transition-opacity duration-150",
                selected ? "opacity-0 pointer-events-none" : "opacity-100 group-hover:opacity-0",
              ].join(" ")}
            >
              <img src={avatarSrc} alt={name} className="size-full object-cover" />
            </div>

          {/* Play / pause circle — shown on hover or when selected */}
          <div
            className={[
              "absolute inset-0 rounded-full bg-[var(--color-2)] flex items-center justify-center transition-opacity duration-150",
              selected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            ].join(" ")}
          >
            <img
              src={selected && isPlaying ? "/Pause.svg" : "/Play.svg"}
              alt=""
              aria-hidden
              className="size-6 object-contain"
            />
          </div>

            {/* Star badge */}
            {starred && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute -top-[3px] left-[30px] size-[18px] flex items-center justify-center">
                    <HugeiconsIcon icon={StarIcon} size={14} color="#F5A623" fill="#F5A623" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">recommended for this language</TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1">
            <p className="text-body-14 text-[var(--color-text-primary)]">{name}</p>
            <p className="text-body-14 text-[var(--color-text-secondary)] whitespace-nowrap">{subtitle}</p>
          </div>
        </div>

        {/* Right: favourite icon — only visible on hover of non-selected card */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsFavourited((prev) => !prev)
            onFavourite?.(e)
          }}
          className={[
            "size-10 rounded-full flex items-center justify-center transition-opacity duration-150",
            isFavourited
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100",
          ].join(" ")}
          aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
        >
          {isFavourited ? (
            <img src="/Favourite filled.svg" alt="" aria-hidden className="size-6 object-contain" />
          ) : (
            <HugeiconsIcon icon={FavouriteIcon} size={24} color="var(--color-text-secondary)" />
          )}
        </button>
      </div>
    </TooltipProvider>
  )
}
