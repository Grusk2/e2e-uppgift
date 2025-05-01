import { useState } from "react";
import styles from "../styles/ChampionSelect.module.css";

type ChampionProps = {
  champion: {
    id: string;
    name: string;
    title: string;
    image: { full: string };
  };
  savedIds: string[];
  topFavorites: { name: string; rating: number }[];
  onSave: (champion: ChampionProps["champion"], rating?: number) => void;
};

export default function ChampionBubble({
  champion,
  savedIds,
  topFavorites,
  onSave,
}: ChampionProps) {
  const isSaved = savedIds.includes(champion.name);
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  const medal = topFavorites.find((c) => c.name === champion.name)?.rating;

  const handleClick = () => {
    if (!isSaved) {
      onSave(champion); // markera som favorit
    } else {
      setShowRatingPopup(true); // visa popup
    }
  };

  const handleSetRating = (rating: number) => {
    onSave(champion, rating);
    setShowRatingPopup(false);
  };

  const handleRemove = () => {
    onSave(champion); // utan rating = tolkas som "remove"
    setShowRatingPopup(false);
  };

  return (
    <div
      className={styles.childComponent}
      onClick={handleClick}
      style={{ position: "relative" }}
    >
      {isSaved && <div className={styles.star}>⭐</div>}
      {medal === 3 && <div className={styles.medal}>🥇</div>}
      {medal === 2 && <div className={styles.medal}>🥈</div>}
      {medal === 1 && <div className={styles.medal}>🥉</div>}
      {showRatingPopup && (
        <div className={styles.ratingPopup} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => handleSetRating(3)}>🥇</button>
          <button onClick={() => handleSetRating(2)}>🥈</button>
          <button onClick={() => handleSetRating(1)}>🥉</button>
          <button onClick={handleRemove} className={styles.removeButton}>❌</button>
        </div>
      )}
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${champion.image.full}`}
        alt={champion.name}
      />
    </div>
  );
}
