// app/layout.tsx
import "../src/styles/globals.css";
import type { Metadata } from "next";
import ChampionSelect from "../src/components//ChampionSelect";

export const metadata: Metadata = {
  title: "League Favorite Picker",
  description: "Choose your favorite champions!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

