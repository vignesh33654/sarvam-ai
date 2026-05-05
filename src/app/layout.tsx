import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarvam AI",
  description: "Sarvam AI application",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
