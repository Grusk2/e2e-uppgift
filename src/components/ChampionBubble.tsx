"use client";

import { useState, useRef, useEffect } from "react";
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
  const popupRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = () => {
    if (!isSaved) {
      onSave(champion);
    } else {
      setShowPopup(!showPopup); // visa meny för medalj / ta bort
    }
  };

  const handleRate = (rating: number) => {
    onSave(champion, rating);
    setShowPopup(false);
  };

  const handleRemove = () => {
    onSave(champion);
    setShowPopup(false);
  };

  const getOutlineClass = () => {
    if (medal === 3) return `${styles.outlined} ${styles.gold}`;
    if (medal === 2) return `${styles.outlined} ${styles.silver}`;
    if (medal === 1) return `${styles.outlined} ${styles.bronze}`;
    if (isSaved) return `${styles.outlined} ${styles.favoriteOnly}`;
    return "";
  };

  // 👇 Stänger popup om man klickar utanför
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div
      className={`${styles.childComponent} ${getOutlineClass()}`}
      onClick={toggleFavorite}
      style={{ position: "relative", cursor: "pointer" }}
    >
      {isSaved && <div className={styles.star}>⭐</div>}
      {medal === 3 && <div className={styles.medal}>🥇</div>}
      {medal === 2 && <div className={styles.medal}>🥈</div>}
      {medal === 1 && <div className={styles.medal}>🥉</div>}

      {showPopup && (
        <div
          ref={popupRef}
          className={styles.ratingPopup}
          onClick={(e) => e.stopPropagation()}
        >
          {[3, 2, 1].map((rating) => (
            <button key={rating} type="button" onClick={() => handleRate(rating)}>
              {rating === 3 ? "🥇" : rating === 2 ? "🥈" : "🥉"}
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
