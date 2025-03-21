"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import "react-bubble-ui/dist/index.css"
import ChampionBubble from "../components/ChampionBubble"
import styles from "../styles/ChampionSelect.module.css"

// Dynamically import BubbleUI to fix SSR issues
const BubbleImport = dynamic(() => import("react-bubble-ui").then(mod => mod.default), {
  ssr: false,
})

type Champion = {
  id: string
  name: string
  title: string
  image: { full: string }
}

export default function ChampionSelect() {
  const [champions, setChampions] = useState<Champion[]>([])

  useEffect(() => {
    const fetchChampions = async () => {
      const version = "14.6.1"
      const res = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
      )
      const data = await res.json()
      const championArray = Object.values(data.data) as Champion[]
      setChampions(championArray)
    }

    fetchChampions()
  }, [])

  const options = {
    size: 120,
    minSize: 60,
    gutter: 8,
    provideProps: true,
    numCols: 12,
    fringeWidth: 80,
    yRadius: 100,
    xRadius: 300,
    cornerRadius: 100,
    showGuides: false,
    compact: true,
    gravitation: 5,
  }
  

  return (
    <main>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Select Your Champion</h1>
      <BubbleImport options={options} className={styles.bubbleUI}>
        {champions.map((champ) => (
          <ChampionBubble key={champ.id} champion={champ} />
        ))}
      </BubbleImport>
    </main>
  )
}
