"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Draggable from "react-draggable"; // <<< import it
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

export default function ChampionSelect() {
  const [champions, setChampions] = useState<Champion[]>([]);

  useEffect(() => {
    const fetchChampions = async () => {
      const version = "14.6.1";
      const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
      const data = await res.json();
      const championArray = Object.values(data.data) as Champion[];
      setChampions(championArray);
    };
    fetchChampions();
  }, []);

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
      <Draggable bounds="parent">
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <BubbleImport options={options} className={styles.bubbleUI}>
      {champions.map((champ) => (
        <ChampionBubble key={champ.id} champion={champ} />
      ))}
    </BubbleImport>
  </div>
</Draggable>

    </main>
  );
}
