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
      setShowPopup((prev) => !prev);
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
      data-cy="champion-bubble"
      className={`${styles.childComponent} ${getOutlineClass()}`}
      data-medal={medal ?? "none"}
      data-saved={isSaved}
      onClick={toggleFavorite}
      style={{ position: "relative", cursor: "pointer" }}
    >
      {isSaved && <div className={styles.star} data-cy="star">⭐</div>}

      {medal && (
        <div className={styles.medal} data-cy="medal" data-medal={medal}>
          {medal === 3 ? "🥇" : medal === 2 ? "🥈" : "🥉"}
        </div>
      )}

      {showPopup && (
        <div
          ref={popupRef}
          className={styles.ratingPopup}
          data-cy="rating-popup"
          onClick={(e) => e.stopPropagation()}
        >
          {[3, 2, 1].map((rating) => (
            <button
              key={rating}
              type="button"
              data-cy={`rate-${rating}`}
              onClick={() => handleRate(rating)}
            >
              {rating === 3 ? "🥇" : rating === 2 ? "🥈" : "🥉"}
            </button>
          ))}
          <button
            type="button"
            data-cy="remove-button"
            className={styles.removeButton}
            onClick={handleRemove}
          >
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
