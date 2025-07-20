
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import { Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // ExtraLight
  variable: '--font-raleway',
});

export const metadata = {
  title: "ANGIRA ART EXPORTS",
  description: "Established in 2005, Angira Art Exports is a globally recognized manufacturer and exporter of solid wood and iron furniture.",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${raleway.variable}`}>
      <body className="font-raleway">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}