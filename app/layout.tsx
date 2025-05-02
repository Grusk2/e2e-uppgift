import "../src/styles/globals.css";

export const metadata = {
  title: "League Favorite Picker",
  description: "Choose your favorite champions!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
