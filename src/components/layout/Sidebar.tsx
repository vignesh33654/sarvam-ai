"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlatformIcon, type IconName } from "@/components/ui/PlatformIcon"

// ── Types ─────────────────────────────────────────────────────────────────────

type NavItemDef = {
  id: string
  label: string
  icon: IconName
}

type SectionDef = {
  id: string
  title: string
  items: NavItemDef[]
  collapsible?: boolean
}

// ── Nav data ──────────────────────────────────────────────────────────────────

const HOME_ITEM: NavItemDef = { id: "home", label: "Home", icon: "Home" }

const SECTIONS: SectionDef[] = [
  {
    id: "playground",
    title: "Playground",
    items: [
      { id: "text-to-speech",        label: "Text to Speech",        icon: "TextToSpeech" },
      { id: "vision",                label: "Vision",                icon: "Vision" },
      { id: "speech-to-text",        label: "Speech to Text",        icon: "Speech" },
      { id: "chat",                  label: "Chat",                  icon: "Chats" },
      { id: "translate",             label: "Translate",             icon: "Translate" },
    ],
  },
  {
    id: "products",
    title: "Products",
    items: [
      { id: "conversational-agents", label: "Conversational Agents", icon: "Conversions" },
      { id: "video-dubbing",         label: "Video Dubbing",         icon: "Video" },
    ],
  },
  {
    id: "developers",
    title: "Developers",
    collapsible: true,
    items: [
      { id: "api-keys", label: "API Keys", icon: "Key" },
      { id: "usage",    label: "Usage",    icon: "Usage" },
      { id: "limits",   label: "Limits",   icon: "Limits" },
      { id: "billing",  label: "Billing",  icon: "Billings" },
      { id: "pricing",  label: "Pricing",  icon: "Pricing" },
    ],
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function NavItem({
  item,
  active,
  onClick,
}: {
  item: NavItemDef
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex w-full items-center gap-2 px-3 py-2 rounded-[50px] transition-colors",
        active
          ? "bg-[var(--color-2)] text-[var(--color-text-primary)]"
          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-2)]",
      ].join(" ")}
    >
      <PlatformIcon name={item.icon} className="shrink-0 overflow-clip relative size-4" />
      <span className="text-body-14 leading-none whitespace-nowrap">{item.label}</span>
    </button>
  )
}

function NavSection({
  section,
  activeItem,
  onItemClick,
  isOpen,
  onToggle,
}: {
  section: SectionDef
  activeItem: string
  onItemClick: (id: string) => void
  isOpen: boolean
  onToggle?: () => void
}) {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center w-full px-3 py-1 mb-[4px]">
        <span className="flex-1 text-body-14 text-[var(--color-text-tertiary)] whitespace-nowrap">
          {section.title}
        </span>
        {section.collapsible && onToggle && (
          <button
            onClick={onToggle}
            className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            <div className={`transition-transform duration-200 ${isOpen ? "" : "rotate-180"}`}>
              <PlatformIcon name="Sarvam" className="overflow-clip relative size-4" />
            </div>
          </button>
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-1 w-full">
          {section.items.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={activeItem === item.id}
              onClick={() => onItemClick(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function UserAvatar() {
  return (
    <div className="shrink-0 size-9 flex items-center justify-center">
      <div
        className="size-6 rounded-full flex items-center justify-center"
        style={{ background: "#ffd7ef" }}
      >
        <span
          className="text-[var(--color-text-primary)]"
          style={{ fontSize: "10px", fontFamily: "var(--font-sans)", fontWeight: 500 }}
        >
          V
        </span>
      </div>
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("text-to-speech")
  const [developersOpen, setDevelopersOpen] = useState(true)
  const pathname = usePathname()

  return (
    <aside
      className="flex flex-col h-full bg-[var(--color-1)] border-r border-[var(--color-divider)]"
      style={{ width: 216, minWidth: 216 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pl-3 pr-3 py-4 shrink-0">
        <div className="h-[26px] flex items-center">
          <img src="/SarvamLogo.png" alt="Sarvam" className="pl-[12px] h-[12px] w-auto" />
        </div>
        <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
          <PlatformIcon name="Sidebar" className="overflow-clip relative size-4" />
        </button>
      </div>

      {/* Nav area */}
      <div className="flex flex-col flex-1 gap-[10px] min-h-0 px-3 overflow-y-auto">
        <NavItem
          item={HOME_ITEM}
          active={activeItem === "home"}
          onClick={() => setActiveItem("home")}
        />

        {SECTIONS.filter((s) => s.id !== "developers").map((section) => (
          <NavSection
            key={section.id}
            section={section}
            activeItem={activeItem}
            onItemClick={setActiveItem}
            isOpen={true}
          />
        ))}

        <div className="flex flex-col flex-1 min-h-0">
          <NavSection
            section={SECTIONS.find((s) => s.id === "developers")!}
            activeItem={activeItem}
            onItemClick={setActiveItem}
            isOpen={developersOpen}
            onToggle={() => setDevelopersOpen((v) => !v)}
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-1 pb-4 shrink-0">
          <NavItem
            item={{ id: "documentation", label: "Documentation", icon: "Document" }}
            active={activeItem === "documentation"}
            onClick={() => setActiveItem("documentation")}
          />
          <Link
            href="/design-system"
            className={[
              "flex w-full items-center gap-2 px-3 py-2 rounded-[50px] transition-colors",
              pathname === "/design-system"
                ? "bg-[var(--color-2)] text-[var(--color-text-primary)]"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-2)]",
            ].join(" ")}
          >
            <PlatformIcon name="Sidebar" className="shrink-0 overflow-clip relative size-4" />
            <span className="text-body-14 leading-none whitespace-nowrap">Design System</span>
          </Link>
          <button className="flex items-center w-full rounded-[50px] hover:bg-[var(--color-2)] transition-colors">
            <UserAvatar />
            <span className="text-body-14 text-[var(--color-text-secondary)] whitespace-nowrap">
              Vignesh
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}
