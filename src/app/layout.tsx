import type { Metadata } from "next";
import "./globals.css";
import "dialkit/styles.css";
import { DialRoot } from "dialkit";
import DevAgentation from "@/components/DevAgentation";

export const metadata: Metadata = {
  title: "Sarvam AI",
  description: "Sarvam AI application",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <DialRoot />
        <DevAgentation />
      </body>
    </html>
  );
}
