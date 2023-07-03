import "./globals.css";
import { Rubik } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Creative Shoes",
  description: "A store focused on selling tennis shoes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
