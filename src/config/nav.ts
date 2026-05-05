import type { NavGroup, NavItem, NavUser } from "@/types/nav";

export const primaryNavItem: NavItem = {
  label: "Home",
  href: "/",
};

export const navGroups: NavGroup[] = [
  {
    title: "Playground",
    items: [
      { label: "Text to Speech", href: "/playground/tts", active: true },
      { label: "Vision", href: "/playground/vision" },
      { label: "Speech to Text", href: "/playground/stt" },
      { label: "Chat", href: "/playground/chat" },
      { label: "Translate", href: "/playground/translate" },
    ],
  },
  {
    title: "Products",
    items: [
      { label: "Conversational Agents", href: "/products/agents" },
      { label: "Video Dubbing", href: "/products/dubbing" },
    ],
  },
  {
    title: "Developers",
    items: [
      { label: "API Keys", href: "/developers/keys" },
      { label: "Usage", href: "/developers/usage" },
      { label: "Limits", href: "/developers/limits" },
      { label: "Billing", href: "/developers/billing" },
      { label: "Pricing", href: "/developers/pricing" },
    ],
  },
];

export const docsNavItem: NavItem = {
  label: "Documentation",
  href: "https://docs.sarvam.ai",
};

export const currentUser: NavUser = {
  name: "Vignesh",
  initials: "VI",
};
