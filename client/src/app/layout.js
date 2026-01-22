import { Sen } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

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
        <Footer />
      </body>
    </html>
  );
}
