import styles from "../styles/ChampionSelect.module.css"

type ChampionProps = {
  champion: {
    id: string
    name: string
    title: string
    image: { full: string }
  }
}

export default function ChampionBubble({ champion }: ChampionProps) {
  return (
    <div className={styles.childComponent}>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${champion.image.full}`}
        alt={champion.name}
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "0.5rem",
        }}
      />
    </div>
  )
}
