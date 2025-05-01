import styles from "../styles/ChampionSelect.module.css";

type ChampionProps = {
  champion: {
    id: string;
    name: string;
    title: string;
    image: { full: string };
  };
  savedIds: string[];
  topFavorites: string[];
  onSave: (champion: ChampionProps["champion"]) => void;
};

export default function ChampionBubble({ champion, savedIds, topFavorites, onSave }: ChampionProps) {
  const isSaved = savedIds.includes(champion.name);
  const index = topFavorites.indexOf(champion.name);

  const getMedal = (i: number) => {
    if (i === 0) return "🥇";
    if (i === 1) return "🥈";
    if (i === 2) return "🥉";
    return null;
  };

  return (
    <div
      className={styles.childComponent}
      onClick={() => onSave(champion)}
      style={{ position: "relative" }}
    >
      {isSaved && <div className={styles.star}>⭐</div>}
      {index !== -1 && <div className={styles.medal}>{getMedal(index)}</div>}
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${champion.image.full}`}
        alt={champion.name}
      />
    </div>
  );
}

