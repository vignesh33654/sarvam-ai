"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { FavouriteIcon } from "@hugeicons/core-free-icons"
import { useTTSStore } from "@/stores/useTTSStore"
import { SpeechCard } from "./SpeechCard"
import { VOICES } from "../voices"

export function FavouritesLayout() {
  const { favourites, selectedVoice, isPlaying, selectVoice, togglePlay, toggleFavourite } =
    useTTSStore()

  const favouritedVoices = VOICES.filter((v) => favourites.has(v.id))

  if (favouritedVoices.length === 0) {
    return (
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center px-4 py-4 shrink-0">
          <p className="text-body-14 text-[var(--color-text-primary)]">Favourites</p>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center gap-3 px-8 text-center">
          <div className="size-12 rounded-full bg-[var(--color-2)] flex items-center justify-center">
            <HugeiconsIcon icon={FavouriteIcon} size={22} color="var(--color-text-tertiary)" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-body-14 text-[var(--color-text-primary)]">No favourites yet</p>
            <p className="text-body-14 text-[var(--color-text-tertiary)]">
              Heart a voice to save it here for quick access
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <div className="flex items-center px-4 py-4 shrink-0">
        <p className="text-body-14 text-[var(--color-text-primary)]">Favourites</p>
        <span className="ml-2 text-body-14 text-[var(--color-text-tertiary)]">
          {favouritedVoices.length}
        </span>
      </div>

      <div className="flex flex-col overflow-y-auto flex-1">
        {favouritedVoices.map((voice) => (
          <SpeechCard
            key={voice.id}
            name={voice.name}
            subtitle={voice.subtitle}
            avatarSrc={voice.avatarSrc}
            starred={voice.starred}
            selected={selectedVoice?.id === voice.id}
            isPlaying={selectedVoice?.id === voice.id && isPlaying}
            favourited={true}
            onSelect={() => {
              if (selectedVoice?.id === voice.id) {
                togglePlay()
              } else {
                selectVoice(voice)
              }
            }}
            onFavourite={() => toggleFavourite(voice.id)}
          />
        ))}
      </div>
    </div>
  )
}
