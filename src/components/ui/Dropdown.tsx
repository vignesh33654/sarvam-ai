"use client"

import { useState, useRef, useEffect, useId, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, Search01Icon } from "@hugeicons/core-free-icons"

export interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  searchable?: boolean
  searchPlaceholder?: string
  align?: "left" | "right"
  side?: "top" | "bottom"
  className?: string
  triggerClassName?: string
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select…",
  searchable = false,
  searchPlaceholder = "Search...",
  align = "left",
  side = "bottom",
  className,
  triggerClassName,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  // -1 means focus is on the search input; ≥0 means focus is on that option index
  const [activeIndex, setActiveIndex] = useState(-1)

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const listboxId = useId()

  const selected = options.find((o) => o.value === value)

  const filtered = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options

  // Keep itemRefs array sized correctly
  itemRefs.current = itemRefs.current.slice(0, filtered.length)

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setActiveIndex(-1)
  }, [])

  const closeAndReturn = useCallback(() => {
    close()
    triggerRef.current?.focus()
  }, [close])

  const openMenu = useCallback((startIndex = searchable ? -1 : 0) => {
    setOpen(true)
    setActiveIndex(startIndex)
  }, [searchable])

  const selectOption = useCallback((optionValue: string) => {
    onChange(optionValue)
    closeAndReturn()
  }, [onChange, closeAndReturn])

  // Move real DOM focus to match activeIndex
  useEffect(() => {
    if (!open) return
    if (activeIndex === -1) {
      searchRef.current?.focus()
    } else {
      itemRefs.current[activeIndex]?.focus()
    }
  }, [open, activeIndex])

  // Close on outside click
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [close])

  // ── Keyboard handlers ──────────────────────────────────────────────────────

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        openMenu(searchable ? -1 : 0)
        break
      case "ArrowUp":
        e.preventDefault()
        openMenu(searchable ? -1 : filtered.length - 1)
        break
      case "Enter":
      case " ":
        e.preventDefault()
        openMenu()
        break
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        if (filtered.length > 0) setActiveIndex(0)
        break
      case "ArrowUp":
        e.preventDefault()
        if (filtered.length > 0) setActiveIndex(filtered.length - 1)
        break
      case "Escape":
        closeAndReturn()
        break
      case "Tab":
        close()
        break
    }
  }

  function handleOptionKeyDown(e: React.KeyboardEvent, index: number) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex((index + 1) % filtered.length)
        break
      case "ArrowUp":
        e.preventDefault()
        if (index === 0 && searchable) {
          setActiveIndex(-1) // back to search input
        } else {
          setActiveIndex((index - 1 + filtered.length) % filtered.length)
        }
        break
      case "Home":
        e.preventDefault()
        setActiveIndex(0)
        break
      case "End":
        e.preventDefault()
        setActiveIndex(filtered.length - 1)
        break
      case "Enter":
      case " ":
        e.preventDefault()
        selectOption(filtered[index].value)
        break
      case "Escape":
        closeAndReturn()
        break
      case "Tab":
        close()
        break
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const alignClass = align === "right" ? "right-0" : "left-0"
  const sideClass = side === "top" ? "bottom-full mb-1" : "top-full mt-1"

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.97, y: side === "bottom" ? -4 : 4 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.12, ease: "easeOut" as const } },
    exit: { opacity: 0, scale: 0.97, y: side === "bottom" ? -4 : 4, transition: { duration: 0.08, ease: "easeIn" as const } },
  }

  return (
    <div ref={containerRef} className={`relative inline-block ${className ?? ""}`}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => (open ? closeAndReturn() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        className={[
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--color-divider)] bg-white text-body-14 text-[var(--color-text-primary)] hover:bg-[var(--color-1)] transition-colors select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text-primary)]",
          triggerClassName ?? "",
        ].join(" ")}
      >
        <span>{selected?.label ?? placeholder}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-center"
        >
          <HugeiconsIcon icon={ArrowDown01Icon} size={16} color="var(--color-text-primary)" />
        </motion.span>
      </button>

      {/* Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={listboxId}
            role="listbox"
            aria-label={selected?.label ?? placeholder}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute ${sideClass} ${alignClass} z-50 bg-white border border-[var(--color-divider)] rounded-2xl shadow-sm min-w-[180px] overflow-hidden`}
          >
            {/* Search */}
            {searchable && (
              <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--color-divider)]">
                <HugeiconsIcon icon={Search01Icon} size={16} color="var(--color-text-tertiary)" />
                <input
                  ref={searchRef}
                  type="text"
                  role="searchbox"
                  aria-label="Search options"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setActiveIndex(-1)
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder={searchPlaceholder}
                  className="flex-1 text-body-14 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] bg-transparent outline-none"
                />
              </div>
            )}

            {/* Options */}
            <div className="p-1 max-h-60 overflow-y-auto">
              {filtered.length === 0 ? (
                <p role="status" className="px-4 py-2 text-body-14 text-[var(--color-text-tertiary)]">
                  No results
                </p>
              ) : (
                filtered.map((option, i) => {
                  const isSelected = option.value === value
                  return (
                    <button
                      key={option.value}
                      ref={(el) => { itemRefs.current[i] = el }}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={-1}
                      onClick={() => selectOption(option.value)}
                      onKeyDown={(e) => handleOptionKeyDown(e, i)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={[
                        "w-full text-left px-4 py-2 text-body-14 rounded-xl transition-colors focus:outline-none",
                        isSelected
                          ? "text-[var(--color-text-primary)] bg-[var(--color-1)] focus:bg-[var(--color-2)]"
                          : "text-[var(--color-text-secondary)] focus:bg-[var(--color-2)]",
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
