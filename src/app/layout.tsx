import type { Metadata } from "next";
import "./globals.css";
import NewsletterBanner from "@/components/ui/NewsletterBanner";
import Navigation from "@/components/ui/Navigation";


export const metadata: Metadata = {
  title: "Cook and Talk - #1 Food, Nutrition, Recipe, Cooking and Diet Platform in Kenya",
  description: "Change your Relationship with Food for the Better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="font-sans">
        <div className="space-y-8 relative">
            <NewsletterBanner/>
            <Navigation/>
        </div>
        {children}
    </body>
    </html>
  );
}
