"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"

interface SearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  inputClassName?: string
  ariaLabel?: string
}

export function Search({
  value,
  onChange,
  placeholder = "Search...",
  className,
  inputClassName,
  ariaLabel = "Search",
}: SearchProps) {
  return (
    <div
      className={[
        "flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-divider)] bg-white transition-colors",
        "focus-within:border-[var(--color-text-secondary)]",
        className ?? "",
      ].join(" ")}
    >
      <HugeiconsIcon icon={Search01Icon} size={18} color="var(--color-text-tertiary)" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={[
          "w-full min-w-[220px] text-body-14 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] bg-transparent outline-none",
          inputClassName ?? "",
        ].join(" ")}
      />
    </div>
  )
}
