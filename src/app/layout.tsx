import "./globals.css"; // This connects the power line
import { Inter } from "next/font/google"; // This fixes the font

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Support Dashboard",
  description: "Internal IBM-grade support tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}