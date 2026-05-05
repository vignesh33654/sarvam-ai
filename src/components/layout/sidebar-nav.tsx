"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  currentUser,
  docsNavItem,
  navGroups,
  primaryNavItem,
} from "@/config/nav";
import type { NavItem } from "@/types/nav";

function NavRow({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = item.active ?? (item.href ? pathname === item.href : false);

  const baseClass =
    "flex h-9 w-full items-center gap-2 rounded-full px-3 text-left text-[15px] leading-[21.75px] transition-colors";
  const activeClass = "bg-[#f0f0f0] text-[#141414]";
  const inactiveClass = "text-[#666666] hover:bg-[#f5f5f5]";

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 rounded-sm border ${
          isActive ? "border-[#141414]" : "border-[#8f8f8f]"
        }`}
      />
      <span className="truncate">{item.label}</span>
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
    >
      {content}
    </button>
  );
}

export function SidebarNav() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-[#fafafa] px-3">
      <header className="py-3">
        <div className="flex items-center justify-between py-2">
          <span className="text-base font-semibold text-[#141414]">
            sarvam.ai
          </span>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#141414] transition-colors hover:bg-[#f0f0f0]"
            aria-label="Open quick actions"
          >
            <span aria-hidden="true" className="h-4 w-4 rounded border border-[#141414]" />
          </button>
        </div>
      </header>

      <nav className="min-h-0 flex-1 overflow-y-auto py-3" aria-label="Main navigation">
        <div className="space-y-5">
          <NavRow item={primaryNavItem} />

          {navGroups.map((group) => (
            <section key={group.title} className="space-y-2">
              <p className="px-3 text-[15px] leading-[21.75px] text-[#999999]">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavRow key={item.label} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </nav>

      <div className="py-1">
        <NavRow item={docsNavItem} />
      </div>

      <footer className="shrink-0 py-2">
        <div className="flex h-9 items-center gap-2 rounded-full px-1">
          <div
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-xs font-medium text-[#141414]"
            aria-hidden="true"
          >
            {currentUser.initials}
          </div>
          <span className="truncate text-[15px] leading-[21.75px] text-[#666666]">
            {currentUser.name}
          </span>
        </div>
      </footer>
    </aside>
  );
}
