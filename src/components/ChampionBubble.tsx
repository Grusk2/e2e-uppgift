"use client"

import { useState } from "react";
import styles from "../styles/ChampionSelect.module.css";

type Champion = {
  id: string;
  name: string;
  title: string;
  image: { full: string };
};

type ChampionProps = {
  champion: Champion;
  savedIds: string[];
  topFavorites: { name: string; rating: number }[];
  onSave: (champion: Champion, rating?: number) => void;
};

export default function ChampionBubble({
  champion,
  savedIds,
  topFavorites,
  onSave,
}: ChampionProps) {
  const isSaved = savedIds.includes(champion.name);
  const medal = topFavorites.find((c) => c.name === champion.name)?.rating;
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    if (!isSaved) {
      onSave(champion);
    } else {
      setShowPopup((prev) => !prev);
    }
  };

  const handleRate = (e: React.MouseEvent, rating: number) => {
    e.stopPropagation();
    onSave(champion, rating);
    setShowPopup(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave(champion);
    setShowPopup(false);
  };

  return (
    <div
      className={styles.childComponent}
      onClick={handleClick}
      style={{ position: "relative", cursor: "pointer" }}
    >
      {isSaved && <div className={styles.star}>⭐</div>}
      {medal === 3 && <div className={styles.medal}>🥇</div>}
      {medal === 2 && <div className={styles.medal}>🥈</div>}
      {medal === 1 && <div className={styles.medal}>🥉</div>}

      {showPopup && (
        <div className={styles.ratingPopup} onClick={(e) => e.stopPropagation()}>
          {[3, 2, 1].map((rating) => (
            <button key={rating} type="button" onClick={(e) => handleRate(e, rating)}>
              {["🥇", "🥈", "🥉"][3 - rating]}
            </button>
          ))}
          <button type="button" onClick={handleRemove} className={styles.removeButton}>
            ❌
          </button>
        </div>
      )}

      <img
        src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${champion.image.full}`}
        alt={champion.name}
      />
    </div>
  );
}
