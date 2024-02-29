import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-Br">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="mx-auto  sm:max-w-2xl px-6 max-w-full">
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </body>
      <GoogleAnalytics gaId={GA_TRACKING_ID || ''} />
    </html>
  );
}
