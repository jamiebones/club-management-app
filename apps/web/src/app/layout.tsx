import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Senior Staff Club Management Application",
  description:
    "This is an application for managing the activities of the Senior Staff Club University of Uyo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section>
          <Navbar />
          {children}
        </section>
      </body>
    </html>
  );
}
