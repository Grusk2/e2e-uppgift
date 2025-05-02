# Champion Favorites

En fullstack League of Legends-inspirerad webbapplikation där användare kan markera sina favorit-champions, tilldela medaljer (guld, silver, brons) och interagera med en bubbelbaserad UI.

## 🌟 Funktionalitet

* Lista på alla champions hämtade från League of Legends API (Data Dragon).
* Klicka för att markera en champion som favorit (med stjärna).
* Klicka igen för att öppna en meny för att tilldela medalj (🥇, 🥈, 🥉).
* Endast en champion kan ha varje typ av medalj samtidigt.
* Bubbel-baserad layout med animationer via `react-bubble-ui`.

## 🚀 Tekniker

* **Frontend:** Next.js (App Router), React
* **Backend:** API-routes i Next.js (`/api/favorites`, `/api/top`, `/api/test/reset`)
* **Databas:** Ansluten via t.ex. Prisma (eller mockad endpoint/test-DB beroende på setup)
* **E2E-tester:** Cypress med mockad test-databas

## 📊 Användarflöden (testade)

* Visa alla champions.
* Markera en favorit.
* Tilldela medalj.
* Ta bort favorit och medalj.
* En medalj per typ kan endast tilldelas en champion åt gången.
* Popup stängs om man klickar utanför.

## 🔧 Installation

```bash
# Klona repo
$ git clone https://github.com/ditt-anvandar-namn/league-champion-favs.git

# Gå in i mappen
$ cd league-champion-favs

# Installera beroenden
$ npm install --legacy-peer-deps (pga react-bubble-ui)

# Skapa en .env-fil med ev. databas-url om relevant
```

## 🌐 Starta projektet

```bash
# Dev-server
$ npm run dev
```

Appen är tillgänglig på `http://localhost:3000`

## 🧪 Köra Cypress-tester

```bash
# Starta test-databas (om relevant)
$ npm run db:test:reset

# Starta dev-server i ett terminalfönster
$ npm run dev

# Starta Cypress i ett annat fönster
$ npx cypress open

# Eller kör headless
$ npx cypress run
```

## 📥 API-routes

* `POST /api/favorites` - Lägg till / ta bort favorit, valfri `rating`
* `GET /api/favorites` - Hämta alla favoriter
* `GET /api/top` - Hämta top-favoriter med medaljer
* `POST /api/test/reset` - Reset för testdatabas (används i tester)

## 🎓 Projektstruktur

```
.
├── pages/
│   └── api/
│       ├── favorites.ts
│       ├── top.ts
│       └── test/reset.ts
├── components/
│   ├── ChampionSelect.tsx
│   └── ChampionBubble.tsx
├── styles/
│   └── ChampionSelect.module.css
├── cypress/
│   └── e2e/app.cy.ts
└── README.md
```

## 😎 Reflektion

* Det var en utmaning att få E2E-tester att fungera stabilt med dynamiska uppdateringar och server-svar.
* Att växla till `data-cy` och sätta statusattribut i DOM\:en gjorde testerna mycket mer pålitliga.
* React Bubble UI krävde lite extra anpassning för att fungera väl med interaktivitet och tester.

## 🌟 Créd

Champion-data hämtas från Riot Games Data Dragon.
Design och implementation: \[Ditt Namn]
