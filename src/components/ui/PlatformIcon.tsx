import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  Home01Icon,
  SparklesIcon,
  Mic01Icon,
  Chat01Icon,
  TranslateIcon,
  Layers01Icon,
  Tv01Icon,
  Key01Icon,
  Invoice01Icon,
  Tag01Icon,
  LayoutLeftIcon,
  ArrowDown01Icon,
  AudioWave01Icon,
  File01Icon,
  Analytics01Icon,
  LimitationIcon,
} from "@hugeicons/core-free-icons"

const ICON_MAP: Record<string, IconSvgElement> = {
  Home:        Home01Icon,
  Sidebar:     LayoutLeftIcon,
  Sarvam:      ArrowDown01Icon,
  Video:       Tv01Icon,
  Audio:       AudioWave01Icon,
  Document:    File01Icon,
  Vision:      SparklesIcon,
  Speech:      Mic01Icon,
  Chats:       Chat01Icon,
  Translate:   TranslateIcon,
  Conversions: Layers01Icon,
  Key:         Key01Icon,
  Usage:       Analytics01Icon,
  Limits:      LimitationIcon,
  Billings:    Invoice01Icon,
  Pricing:     Tag01Icon,
}

export type IconName = keyof typeof ICON_MAP | "TextToSpeech"

export function PlatformIcon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  if (name === "TextToSpeech") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#tts-clip)">
          <path d="M7.28592 12H4.71449M6 4V11.9997M6 4C6.5946 4 7.35836 4.01357 7.96646 4.07843C8.22364 4.10585 8.35226 4.11957 8.46604 4.16794C8.70283 4.26855 8.89363 4.48912 8.96546 4.74518C9 4.86829 9 5.00877 9 5.28974M6 4C5.4054 4 4.64163 4.01357 4.03355 4.07843C3.77636 4.10585 3.64776 4.11957 3.53394 4.16794C3.29719 4.26855 3.10635 4.48912 3.03453 4.74518C3 4.86829 3 5.00877 3 5.28974" stroke="currentColor" strokeLinecap="round"/>
          <path d="M11.3954 0.529852C13.3891 1.09089 14.5504 3.16186 13.9894 5.1555M10.7182 2.9364C11.3827 3.12341 11.7698 3.81373 11.5828 4.47828" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
        </g>
        <defs>
          <clipPath id="tts-clip">
            <rect width="16" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    )
  }

  const icon = ICON_MAP[name]
  return (
    <span className={className ?? "inline-flex items-center justify-center size-4"}>
      <HugeiconsIcon icon={icon} size={16} strokeWidth={1.5} />
    </span>
  )
}
