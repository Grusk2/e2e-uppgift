"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-bubble-ui/dist/index.css";
import ChampionBubble from "../components/ChampionBubble";
import styles from "../styles/ChampionSelect.module.css";

const BubbleImport = dynamic(() => import("react-bubble-ui").then((mod) => mod.default), {
  ssr: false,
});

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
    const fetchChampions = async () => {
      const version = "14.6.1";
      const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
      const data = await res.json();
      const championArray = Object.values(data.data) as Champion[];
      setChampions(championArray);
    };

    const fetchFavorites = async () => {
      const res = await fetch("/api/favorites");
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Expected array but got:", data);
        return;
      }

      const names = data.map((champ: any) => champ.name);
      setSavedChampions(names);
    };

    fetchChampions();
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchTop = async () => {
      const res = await fetch("/api/top"); // 👈 ändrat från /favorites/top
      const data = await res.json();
      setTopFavorites(data.map((c: any) => ({ name: c.name, rating: c.rating })));
    };
    

    fetchTop();
  }, [savedChampions]);

  const handleSave = async (champion: Champion, rating?: number) => {
    try {
      const payload: { name: string; rating?: number } = { name: champion.name };
      if (typeof rating === "number") {
        payload.rating = rating;
      }
  
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const text = await res.text();
        console.error("API error response:", text);
        return;
      }
  
      const result = await res.json();
  
      setSavedChampions((prev) =>
        result.removed
          ? prev.filter((n) => n !== result.name)
          : [...prev, result.name]
      );
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };
  
  
  

  const options = {
    size: 140,
    minSize: 80,
    gutter: 2,
    provideProps: true,
    numCols: 12,
    fringeWidth: 80,
    yRadius: 250,
    xRadius: 250,
    cornerRadius: 300,
    showGuides: false,
    compact: true,
    gravitation: 1,
  };

  return (
    <main className={styles.pageContainer}>
      <h1 className={styles.title}>Select Your Champion</h1>
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
