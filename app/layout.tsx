import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "go30 — 30-Day Go Learning Tracker",
  description:
    "A personal, gamified tracker for learning Go in 30 days. Built as a portfolio piece.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
