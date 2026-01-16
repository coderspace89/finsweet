import { Sen } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/layout/Header";

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
});


export const metadata = {
  title: "Finsweet",
  description: "A Next.js Blog With Strapi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sen.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
