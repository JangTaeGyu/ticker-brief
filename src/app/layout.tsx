import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ticker Brief Report",
  description: "Ticker Brief Report Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
