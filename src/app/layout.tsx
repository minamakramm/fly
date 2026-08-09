import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Fly Capstone Application",
  description: "Production-ready Next.js application scaffolded with Server Components, Tailwind CSS, routed placeholder screens, and health check telemetry.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <Navigation />
        
        {/* Main Content Viewport */}
        <main className="flex-1 md:pl-64 pt-16 md:pt-0 min-h-screen">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
