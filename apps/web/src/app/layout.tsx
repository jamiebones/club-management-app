import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { NextAuthProvider } from "./provider";
import { Bounce, ToastContainer } from "react-toastify";

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
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen  bg-gray-100">
            <Navbar />
            <main className="flex-1 p-4 bg-white">
              {/* Main Content Area */}
              {children}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
             
              />
            </main>
            {/* <footer className="bg-blue-500 text-white p-4 mt-auto">
              <p>&copy; 2024 My App</p>
            </footer> */}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
