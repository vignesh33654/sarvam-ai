"use client";

import dynamic from "next/dynamic";

const AgentationDynamic = dynamic(
  () => import("agentation").then((m) => ({ default: m.Agentation })),
  { ssr: false }
);

export default function DevAgentation() {
  if (process.env.NODE_ENV !== "development") return null;
  return <AgentationDynamic />;
}
