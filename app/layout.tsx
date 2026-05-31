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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
