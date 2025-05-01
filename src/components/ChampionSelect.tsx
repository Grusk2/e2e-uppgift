"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-bubble-ui/dist/index.css";
import ChampionBubble from "./ChampionBubble";
import styles from "../styles/ChampionSelect.module.css";

// ✅ Flyttad utanför komponenten – viktigt!
const BubbleImport = dynamic(
  () => import("react-bubble-ui").then((mod) => mod.default),
  {
    ssr: false,
  }
);

type Champion = {
  id: string;
  name: string;
  title: string;
  image: { full: string };
};

type TopChampion = { name: string; rating: number };

export default function ChampionSelect() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [savedChampions, setSavedChampions] = useState<string[]>([]);
  const [topFavorites, setTopFavorites] = useState<TopChampion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const version = "14.6.1";
        const champRes = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );
        const champData = await champRes.json();
        setChampions(Object.values(champData.data) as Champion[]);

        const favRes = await fetch("/api/favorites");
        const favData = await favRes.json();
        setSavedChampions(favData.map((c: any) => c.name));

        const topRes = await fetch("/api/top");
        const topData = await topRes.json();
        setTopFavorites(
          topData.map((c: any) => ({ name: c.name, rating: c.rating }))
        );
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (champion: Champion, rating?: number) => {
    const name = champion.name;

    // Optimistisk uppdatering
    setSavedChampions((prev) => {
      const exists = prev.includes(name);
      if (rating === undefined) {
        return exists ? prev.filter((n) => n !== name) : [...prev, name];
      }
      return exists ? prev : [...prev, name];
    });

    setTopFavorites((prev) => {
      if (typeof rating === "number") {
        // Ta bort eventuell champion med samma rating
        const filtered = prev.filter(
          (c) => c.rating !== rating && c.name !== name
        );
        return [...filtered, { name, rating }];
      } else {
        // Ingen rating => ta bort från topFavorites
        return prev.filter((c) => c.name !== name);
      }
    });

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating }),
      });

      if (!res.ok) {
        console.error("Server responded with error:", await res.text());
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const options = {
    size: 180,
    minSize: 130,
    gutter: 3,
    provideProps: true,
    numCols: 12,
    fringeWidth: 120,
    yRadius: 300,
    xRadius: 300,
    cornerRadius: 300,
    showGuides: false,
    compact: true,
    gravitation: 1,
  };

  return (
    <main className={styles.pageContainer}>
      <div className={styles.guide}>
        {[
          { icon: "🖱️", text: "Scrolla för fler champions" },
          { icon: "⇧🖱️", text: "Scrolla i sidled" },
          { icon: "⭐", text: "Klicka för att lägga till som favorit" },
          { icon: "🥇", text: "Klicka igen för att välja medalj" },
          { icon: "❌", text: "Ta bort favorit" },
        ].map((item, idx) => (
          <div key={idx} className={styles["guide-item"]}>
            <span className={styles["guide-icon"]}>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <BubbleImport options={options} className={styles.bubbleUI}>
          {champions.map((champ) => (
            <ChampionBubble
              key={champ.id}
              champion={champ}
              savedIds={savedChampions}
              topFavorites={topFavorites}
              onSave={handleSave}
            />
          ))}
        </BubbleImport>
      </div>
    </main>
  );
}
