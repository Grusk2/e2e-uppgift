import React from "react";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css"; // Importera Bubble UI stilar

export default function Home() {
  // BubbleUI options
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

  // BubbleUI children
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
    // Lägg till fler bubble items här om du vill
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
