import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layout } from "./_layout";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Instagram Widget",
  description: "Weblab420 Instgram Widget",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
