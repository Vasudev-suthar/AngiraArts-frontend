import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import { Raleway, Platypi } from "next/font/google";

// Raleway setup
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
});

// Platypi setup
const platypi = Platypi({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-platypi",
});

export const metadata = {
  title: "ANGIRA ART EXPORTS",
  description:
    "Established in 2005, Angira Art Exports is a globally recognized manufacturer and exporter of solid wood and iron furniture.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${raleway.variable} ${platypi.variable}`}>
      <body className="font-raleway">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}



// import "./globals.css";
// import ThemeProvider from "@/context/ThemeProvider";
// import { Raleway } from 'next/font/google';

// const raleway = Raleway({
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // ExtraLight
//   variable: '--font-raleway',
// });

// export const metadata = {
//   title: "ANGIRA ART EXPORTS",
//   description: "Established in 2005, Angira Art Exports is a globally recognized manufacturer and exporter of solid wood and iron furniture.",
//   icons: {
//     icon: "/logo.png",
//   }
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={`${raleway.variable}`}>
//       <body className="font-raleway">
//         <ThemeProvider>
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }