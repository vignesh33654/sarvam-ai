import { create } from "zustand"

export interface Voice {
  id: string
  name: string
  subtitle: string
  avatarSrc: string
  starred: boolean
}

interface TTSState {
  selectedVoice: Voice | null
  isPlaying: boolean
  currentTime: number
  duration: number
  generationPhase: "idle" | "detecting-language" | "loading-speech"
  favourites: Set<string>
  feedback: Record<string, "up" | "down" | null>
  highlightText: boolean

  selectVoice: (voice: Voice) => void
  togglePlay: () => void
  setIsPlaying: (v: boolean) => void
  setCurrentTime: (t: number) => void
  setDuration: (d: number) => void
  setGenerationPhase: (phase: "idle" | "detecting-language" | "loading-speech") => void
  toggleFavourite: (id: string) => void
  setFeedback: (id: string, type: "up" | "down" | null) => void
  setHighlightText: (v: boolean) => void
}

export const useTTSStore = create<TTSState>((set) => ({
  selectedVoice: null,
  isPlaying: false,
  currentTime: 0,
  duration: 30,
  generationPhase: "idle",
  favourites: new Set(),
  feedback: {},
  highlightText: true,

  selectVoice: (voice) => set({ selectedVoice: voice, currentTime: 0, isPlaying: true }),
  togglePlay: () => set((s) => ({ isPlaying: s.selectedVoice ? !s.isPlaying : false })),
  setIsPlaying: (v) => set({ isPlaying: v }),
  setCurrentTime: (t) => set({ currentTime: t }),
  setDuration: (d) => set({ duration: d }),
  setGenerationPhase: (phase) => set({ generationPhase: phase }),
  toggleFavourite: (id) =>
    set((s) => {
      const next = new Set(s.favourites)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return { favourites: next }
    }),
  setFeedback: (id, type) =>
    set((s) => ({ feedback: { ...s.feedback, [id]: type } })),
  setHighlightText: (v) => set({ highlightText: v }),
}))
