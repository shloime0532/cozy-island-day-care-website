import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cozy-island-day-care-website.vercel.app"),
  title: "Cozy Island Day Care | Nurturing Childcare in Lakewood, NJ",
  description:
    "Licensed childcare center in Lakewood, NJ serving children ages 0-12. Infant care, toddler programs, preschool, and after-school care in a warm, safe environment.",
  openGraph: {
    title: "Cozy Island Day Care | Nurturing Childcare in Lakewood, NJ",
    description:
      "Licensed childcare center in Lakewood, NJ. Infant care, toddler programs, preschool, and after-school care.",
    images: ["/og-image.png"],
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
