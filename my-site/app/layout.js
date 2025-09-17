
import "react-day-picker/dist/style.css";
import "./globals.css";

export const metadata = {
  title: "Meu Site",
  description: "Exemplo com Date Picker pt-BR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
