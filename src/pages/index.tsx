import React from "react";
import dynamic from "next/dynamic";
import "react-bubble-ui/dist/index.css"; // Import Bubble UI styles

// Fix: Dynamically import BubbleUI
const BubbleUI = dynamic(() => import("react-bubble-ui").then(mod => mod.default), { ssr: false });

export default function Home() {
  const options = {
    size: 120,
    minSize: 40,
    gutter: 10,
    provideProps: true,
    numCols: 4,
    fringeWidth: 150,
    yRadius: 150,
    xRadius: 150,
    cornerRadius: 50,
    showGuides: false,
    compact: true,
    gravitation: 10
  };

  const children = [
    <div className="bubble-item" key="1">
      <img
        src="https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/Aatrox.png"
        alt="Aatrox"
        className="bubble-img"
      />
    </div>,
    <div className="bubble-item" key="2">
      <img
        src="https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/Ahri.png"
        alt="Ahri"
        className="bubble-img"
      />
    </div>
    // Add more items here if you want
  ];

  return (
    <>
      <h1>hello</h1>

      <BubbleUI options={options} className="myBubbleUI">
        {children}
      </BubbleUI>
    </>
  );
}
