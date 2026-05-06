function CodeBracketsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M5.5 4.5L2 8l3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 4.5L14 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TopBar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-[var(--color-divider)] shrink-0">
      <div className="flex flex-col gap-[4px]">
        <span className="text-display-20 text-[var(--color-text-primary)]">
          {title}
        </span>
        <span className="text-body-14 text-[var(--color-text-tertiary)]">{subtitle}</span>
      </div>

      <div className="flex items-center gap-[10px]">
        <button className="flex items-center justify-center h-10 px-[16px] text-body-14 text-[var(--color-text-primary)] border border-[var(--color-divider)] rounded-full bg-white hover:bg-[var(--color-2)] transition-colors whitespace-nowrap">
          Feedback
        </button>
        <button className="flex items-center gap-[6px] px-4 py-2 text-body-14 text-[var(--color-text-primary)] border border-[var(--color-divider)] rounded-full bg-white hover:bg-[var(--color-2)] transition-colors whitespace-nowrap">
          <CodeBracketsIcon />
          Get code
        </button>
      </div>
    </header>
  )
}
